import { createContext, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { eventEmitter } from '@event-emitters'

import usePersonalInformationAPI from '@features/personal-information/apis/use-personal-information-api'
import EVENT_PERSONAL_INFO from '@features/personal-information/event-emitters/personal-info-event'
import { TSelectedSocialLink } from '@features/personal-information/types/personal-information-types'
import personalInformationSchema, {
  initialFormGeneralPersonalInfo,
  TFormGeneralPersonalInfo,
  TGeneralPersonalInfoSchema
} from '@features/personal-information/validations/general-personal-info-schema'
import socialLinkSchema from '@features/personal-information/validations/social-link-schema'
import useGeneralAPI from '@apis/use-general-api'

import useFile from '@hooks/use-file'
import { useAppDispatch } from '@store/store'
import { handleSetAlertConfig } from '@store/ui-slice'
import {
  extractValueFromForm,
  generateOptions,
  mapErrorMessagePromiseAll,
  mappingErrorsToForm,
  mappingValuesToForm,
  mergeArraysOfObjects,
  TParamsMapErrorMessagePromiseAll
} from '@lib/helper/function'
import { TEventOnChange, TEventSubmitForm, TOption } from '@typescript/ui-types'

interface TStateFormPersonalInfo {
  formGeneralPersonalInfo: TFormGeneralPersonalInfo
  listSelectedSocialLink: TSelectedSocialLink[]
  setListSelectedSocialLink: React.Dispatch<React.SetStateAction<TSelectedSocialLink[]>>
  handleOnChangeFormGeneralPersonalInfo: (e: TEventOnChange) => void
  handleOnSubmit: (e: TEventSubmitForm) => void
  isLoading: boolean
}

const intialStateFormPersonalInformation = {
  formGeneralPersonalInfo: initialFormGeneralPersonalInfo,
  listSelectedSocialLink: [],
  setListSelectedSocialLink: () => null,
  handleOnChangeFormGeneralPersonalInfo: () => null,
  handleOnSubmit: (_e: TEventSubmitForm) => null,
  isLoading: false
}

export const contextFormPersonalInfo = createContext<TStateFormPersonalInfo>(
  intialStateFormPersonalInformation
)

const ContextFormPersonalInfo = (props: { children: React.ReactNode }) => {
  const { children } = props
  const navigate = useNavigate()
  const { upsertPersonalInformation, upsertBulkSocialLink, getDetailPersonalInformation } =
    usePersonalInformationAPI()
  const { getListProvince, getListCity, getListDistrict, getListProfession, getListPostalCode } =
    useGeneralAPI()
  const { handleGetFileFromUrl } = useFile()
  const [listSelectedSocialLink, setListSelectedSocialLink] = useState<TSelectedSocialLink[]>([])
  const [formGeneralPersonalInfo, setFormGeneralInfoPersonalInfo] = useState(
    intialStateFormPersonalInformation.formGeneralPersonalInfo
  )
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  type TKeyFormGeneralPersonalInfo = keyof typeof formGeneralPersonalInfo

  useEffect(() => {
    handleInitialData()
    return () => {
      setFormGeneralInfoPersonalInfo({ ...initialFormGeneralPersonalInfo })
    }
  }, [])

  const handleInitialData = async () => {
    let updatedFormGeneralPersonalInfo = formGeneralPersonalInfo
    updatedFormGeneralPersonalInfo['id_province'].options = generateOptions({
      options: (await getListProvince())?.data || []
    })
    updatedFormGeneralPersonalInfo['id_profession'].options = generateOptions({
      options: (await getListProfession())?.data || []
    })

    const resultPersonalInfo = await getDetailPersonalInformation()
    if (resultPersonalInfo?.data) {
      updatedFormGeneralPersonalInfo = mappingValuesToForm({
        form: formGeneralPersonalInfo,
        values: resultPersonalInfo?.data
      })

      updatedFormGeneralPersonalInfo['id_city'].options = generateOptions({
        options:
          (
            await getListCity({
              province_code: resultPersonalInfo?.data?.id_province
            })
          )?.data || []
      })
      updatedFormGeneralPersonalInfo['id_district'].options = await generateOptions({
        options:
          (
            await getListDistrict({
              city_code: resultPersonalInfo?.data?.id_city
            })
          )?.data || []
      })

      const city_name = updatedFormGeneralPersonalInfo['id_city'].options?.filter(
        (option) => option.value === resultPersonalInfo?.data?.id_city
      )?.[0]?.label
      const district_name = updatedFormGeneralPersonalInfo['id_district'].options?.filter(
        (option) => option.value === resultPersonalInfo?.data?.id_district
      )?.[0]?.label

      const postalCodes = await generateOptions({
        options:
          (
            await getListPostalCode({
              city_name,
              district_name
            })
          )?.data || []
      })

      updatedFormGeneralPersonalInfo['id_postal_code'].options = postalCodes
      updatedFormGeneralPersonalInfo['id_postal_code'].value = postalCodes?.[0]?.value

      updatedFormGeneralPersonalInfo['professional_image'].value = await handleGetFileFromUrl({
        url: resultPersonalInfo?.data?.professional_image,
        filename: 'professional-image'
      })
    }

    setFormGeneralInfoPersonalInfo({ ...updatedFormGeneralPersonalInfo })
  }

  const handleOnChangeFormGeneralPersonalInfo = useCallback(async (e: TEventOnChange) => {
    const currForm = formGeneralPersonalInfo
    const name = e.target.name as TKeyFormGeneralPersonalInfo
    const value = e.target.value
    currForm[name].value = value
    currForm[name].errorMessage = ''

    if (name == 'id_province') {
      ;['id_city', 'id_district', 'id_postal_code']?.map((key) => {
        currForm[key as TKeyFormGeneralPersonalInfo].value = ''
      })
      currForm['id_city'].options = generateOptions({
        options:
          (
            await getListCity({
              province_code: value
            })
          )?.data || []
      })
    }

    if (name == 'id_city') {
      ;['id_district', 'id_postal_code']?.map((key) => {
        currForm[key as TKeyFormGeneralPersonalInfo].value = ''
      })
      currForm['id_district'].options = await generateOptions({
        options:
          (
            await getListDistrict({
              city_code: value
            })
          )?.data || []
      })
    }

    if (name == 'id_district') {
      const city_code = currForm['id_city']?.value
      const city_name = (currForm?.['id_city']?.options as TOption[])?.filter(
        (city) => city?.value === city_code
      )?.[0]?.label

      const district_name = (currForm?.['id_district']?.options as TOption[])?.filter(
        (district) => district?.value === value
      )?.[0]?.label

      const postalCodes = await generateOptions({
        options:
          (
            await getListPostalCode({
              city_name,
              district_name
            })
          )?.data || []
      })
      currForm['id_postal_code'].options = postalCodes
      currForm['id_postal_code'].value = postalCodes?.[0]?.value
      currForm['id_postal_code'].errorMessage = ''
    }

    if (['id_city', 'id_province', 'id_district']?.includes(name)) {
      formGeneralPersonalInfo['id_city'].disabled = !currForm.id_province.value
      formGeneralPersonalInfo['id_district'].disabled = !currForm.id_city.value
    }

    setFormGeneralInfoPersonalInfo({
      ...currForm
    })
  }, [])

  const handleOnSubmit = async (e: TEventSubmitForm) => {
    setIsLoading(true)
    try {
      e?.preventDefault()
      const { isValid: isValidFormGeneralInfo, form: updatedFormGeneralInfo } = mappingErrorsToForm<
        TGeneralPersonalInfoSchema,
        typeof formGeneralPersonalInfo
      >({
        form: formGeneralPersonalInfo,
        schema: personalInformationSchema
      })

      eventEmitter.emit(
        EVENT_PERSONAL_INFO.ON_VALIDATE_PERSONAL_INFO,
        listSelectedSocialLink?.length > 0
      )

      let isValidFormListSelectedSocialLink = !(listSelectedSocialLink?.length == 0)
      const updateListSelectedSocialLink = listSelectedSocialLink?.map((selectedSocialLink) => {
        const form = {
          url: {
            name: 'url',
            value: selectedSocialLink.value,
            errorMessage: ''
          }
        }

        const { isValid, form: updatedForm } = mappingErrorsToForm({
          form,
          schema: socialLinkSchema(selectedSocialLink?.name)
        })

        if (!isValid) isValidFormListSelectedSocialLink = false
        return {
          ...selectedSocialLink,
          errorMessage: updatedForm?.url?.errorMessage
        }
      })

      setListSelectedSocialLink([...updateListSelectedSocialLink])
      setFormGeneralInfoPersonalInfo({ ...updatedFormGeneralInfo })

      if (isValidFormGeneralInfo && isValidFormListSelectedSocialLink) {
        const personalInformation = extractValueFromForm({ ...formGeneralPersonalInfo })
        const socialLinks = listSelectedSocialLink?.map((selectedSocliaLink) => ({
          id_category: selectedSocliaLink.id_category,
          id: selectedSocliaLink?.id,
          url: selectedSocliaLink?.value
        }))

        const results = await Promise.all([
          upsertPersonalInformation(personalInformation),
          upsertBulkSocialLink(socialLinks)
        ])

        const errorMessage = mapErrorMessagePromiseAll(
          mergeArraysOfObjects(results, [
            { moduleName: 'General Personal Information' },
            {
              moduleName: 'Social Link'
            }
          ]) as TParamsMapErrorMessagePromiseAll
        )

        const isSuccess = results?.every((result) => result?.status)
        dispatch(
          handleSetAlertConfig({
            show: true,
            message: errorMessage,
            type: isSuccess ? 'sucess' : 'error',
            withIcon: true
          })
        )
        setTimeout(() => {
          navigate(0)
        }, 3000)
      }
    } catch (error: any) {
      console.log('error: ', error?.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <contextFormPersonalInfo.Provider
      value={{
        formGeneralPersonalInfo,
        listSelectedSocialLink,
        setListSelectedSocialLink,
        handleOnChangeFormGeneralPersonalInfo,
        handleOnSubmit,
        isLoading
      }}
    >
      {children}
    </contextFormPersonalInfo.Provider>
  )
}

export default ContextFormPersonalInfo
