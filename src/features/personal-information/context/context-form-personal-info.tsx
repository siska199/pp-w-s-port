import { createContext, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { eventEmitter } from '@event-emitters'

import usePersonalInformationAPI from '@features/personal-information/apis/use-personal-information-api'
import EVENT_PERSONAL_INFO from '@features/personal-information/event-emitters/personal-info-event'
import { TSelectedSocialLink } from '@features/personal-information/types/personal-information-types'
import generalPersonalInfoSchema, {
  initialFormGeneralPersonalInfo,
  TFormGeneralPersonalInfo,
  TGeneralPersonalInfoSchema
} from '@features/personal-information/validations/general-personal-info-schema'
import socialLinkSchema from '@features/personal-information/validations/social-link-schema'
import useGeneralAPI from '@apis/use-general-api'

import useFile from '@hooks/use-file'
import { useAppDispatch } from '@store/store'
import { handleSetAlertConfig, handleSetIsloading } from '@store/ui-slice'
import {
  extractValueFromForm,
  generateOptions,
  mapErrorMessagePromiseAll,
  mappingErrorsToForm,
  mappingValuesToForm,
  mergeArraysOfObjects,
  TParamsMapErrorMessagePromiseAll
} from '@lib/helper/function'
import { TEventOnChange, TEventSubmitForm } from '@typescript/ui-types'

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
  const dispatch = useAppDispatch()
  const { handleGetFileFromUrl } = useFile()

  const [listSelectedSocialLink, setListSelectedSocialLink] = useState<TSelectedSocialLink[]>([])
  const [formGeneralPersonalInfo, setFormGeneralInfoPersonalInfo] = useState(
    intialStateFormPersonalInformation.formGeneralPersonalInfo
  )
  const [isLoading, setIsLoading] = useState(false)
  type TKeyFormGeneralPersonalInfo = keyof typeof formGeneralPersonalInfo

  useEffect(() => {
    handleInitialData()
    return () => {
      setFormGeneralInfoPersonalInfo({ ...initialFormGeneralPersonalInfo })
    }
  }, [])

  const handleInitialData = async () => {
    dispatch(handleSetIsloading(true))

    try {
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
                id_province: resultPersonalInfo?.data?.id_province
              })
            )?.data || []
        })
        updatedFormGeneralPersonalInfo['id_district'].options = await generateOptions({
          options:
            (
              await getListDistrict({
                id_city: resultPersonalInfo?.data?.id_city
              })
            )?.data || []
        })

        updatedFormGeneralPersonalInfo['id_postal_code'].options = await generateOptions({
          options:
            (
              await getListPostalCode({
                id_district: resultPersonalInfo?.data?.id_district
              })
            )?.data || []
        })

        updatedFormGeneralPersonalInfo['professional_image'].value = await handleGetFileFromUrl({
          url: resultPersonalInfo?.data?.professional_image,
          filename: 'professional-image'
        })
      }

      setFormGeneralInfoPersonalInfo({ ...updatedFormGeneralPersonalInfo })
    } catch (error: any) {
      console.log('error: ', error?.message)
    } finally {
      dispatch(handleSetIsloading(false))
    }
  }

  const handleOnChangeFormGeneralPersonalInfo = useCallback(async (e: TEventOnChange) => {
    const currForm = formGeneralPersonalInfo
    const name = e.target.name as TKeyFormGeneralPersonalInfo
    const value = e.target.value
    currForm[name].value = value
    currForm[name].errorMessage = ''

    if (name == 'id_province') {
      const keys = ['id_city', 'id_district', 'id_postal_code'] as Extract<
        TKeyFormGeneralPersonalInfo,
        'id_city' | 'id_district' | 'id_postal_code'
      >[]

      keys?.map((key) => {
        currForm[key].value = ''
        if (!value) {
          currForm[key].disabled = true
        }
      })
      currForm['id_city'].disabled = !currForm.id_province.value

      currForm['id_city'].options = generateOptions({
        options:
          (
            await getListCity({
              id_province: value
            })
          )?.data || []
      })
    }

    if (name == 'id_city') {
      const keys = ['id_district', 'id_postal_code'] as Extract<
        TKeyFormGeneralPersonalInfo,
        'id_district' | 'id_postal_code'
      >[]

      keys?.map((key) => {
        currForm[key].value = ''
        if (!value) {
          currForm[key].disabled = true
        }
      })
      currForm['id_district'].disabled = !currForm.id_province.value

      currForm['id_district'].options = await generateOptions({
        options:
          (
            await getListDistrict({
              id_city: value
            })
          )?.data || []
      })
    }

    if (name == 'id_district') {
      const keys = ['id_postal_code'] as Extract<TKeyFormGeneralPersonalInfo, 'id_postal_code'>[]

      keys?.map((key) => {
        currForm[key].value = ''
        currForm[key].disabled = !currForm.id_province.value
      })

      const postalCodes = (
        await generateOptions({
          options:
            (
              await getListPostalCode({
                id_district: value
              })
            )?.data || [],
          listSaveField: ['postal_code']
        })
      )?.map((data: any) => ({
        label: `${data.postal_code}-(${data?.label})`,
        value: data?.value
      }))
      currForm['id_postal_code'].options = postalCodes
      currForm['id_postal_code'].errorMessage = ''
    }

    setFormGeneralInfoPersonalInfo({
      ...currForm
    })
  }, [])

  const handleOnSubmit = async (e: TEventSubmitForm) => {
    dispatch(handleSetIsloading(true))
    setIsLoading(true)
    try {
      e?.preventDefault()
      const { isValid: isValidFormGeneralInfo, form: updatedFormGeneralInfo } = mappingErrorsToForm<
        TGeneralPersonalInfoSchema,
        typeof formGeneralPersonalInfo
      >({
        form: formGeneralPersonalInfo,
        schema: generalPersonalInfoSchema
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

        isSuccess &&
          setTimeout(() => {
            navigate(0)
          }, 3000)
      }
    } catch (error: any) {
      console.log('error: ', error?.message)
    } finally {
      setIsLoading(false)
      dispatch(handleSetIsloading(false))
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
