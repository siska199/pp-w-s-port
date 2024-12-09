import { createContext, useCallback, useEffect, useState } from 'react'
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

import {
  extractValueFromForm,
  generateOptions,
  mappingErrorsToForm,
  mappingValuesToForm
} from '@lib/helper/function'
import { TEventOnChange, TEventSubmitForm, TOption } from '@typescript/ui-types'

interface TStateFormPersonalInfo {
  formGeneralPersonalInfo: TFormGeneralPersonalInfo
  listSelectedSocialLink: TSelectedSocialLink[]
  setListSelectedSocialLink: React.Dispatch<React.SetStateAction<TSelectedSocialLink[]>>
  handleOnChangeFormGeneralPersonalInfo: (e: TEventOnChange) => void
  handleOnSubmit: (e: TEventSubmitForm) => void
}

const intialStateFormPersonalInformation = {
  formGeneralPersonalInfo: initialFormGeneralPersonalInfo,
  listSelectedSocialLink: [],
  setListSelectedSocialLink: () => null,
  handleOnChangeFormGeneralPersonalInfo: () => null,
  handleOnSubmit: (_e: TEventSubmitForm) => null
}

export const contextFormPersonalInfo = createContext<TStateFormPersonalInfo>(
  intialStateFormPersonalInformation
)

const ContextFormPersonalInfo = (props: { children: React.ReactNode }) => {
  const { children } = props
  const { upsertPersonalInformation, upsertBulkSocialLink, getDetailPersonalInformation } =
    usePersonalInformationAPI()
  const [formGeneralPersonalInfo, setFormGeneralInfoPersonalInfo] = useState(
    intialStateFormPersonalInformation.formGeneralPersonalInfo
  )
  type TKeyFormGeneralPersonalInfo = keyof typeof formGeneralPersonalInfo
  const [listSelectedSocialLink, setListSelectedSocialLink] = useState<TSelectedSocialLink[]>([])
  const { getListProvince, getListCity, getListDistrict, getListProfession, getListPostalCode } =
    useGeneralAPI()

  useEffect(() => {
    handleInitialData()
    return () => {
      setFormGeneralInfoPersonalInfo({ ...initialFormGeneralPersonalInfo })
    }
  }, [])

  const handleInitialData = async () => {
    let updatedFormGeneralPersonalInfo = formGeneralPersonalInfo
    const resultPersonalInfo = await getDetailPersonalInformation()
    if (resultPersonalInfo?.data) {
      updatedFormGeneralPersonalInfo = mappingValuesToForm({
        form: formGeneralPersonalInfo,
        values: resultPersonalInfo?.data
      })
    }

    updatedFormGeneralPersonalInfo['province'].options = generateOptions({
      options: (await getListProvince())?.data || []
    })
    updatedFormGeneralPersonalInfo['id_profession'].options = generateOptions({
      options: (await getListProfession())?.data || []
    })

    setFormGeneralInfoPersonalInfo({ ...updatedFormGeneralPersonalInfo })
  }

  const handleOnChangeFormGeneralPersonalInfo = useCallback(async (e: TEventOnChange) => {
    const currForm = formGeneralPersonalInfo
    const name = e.target.name as TKeyFormGeneralPersonalInfo
    const value = e.target.value
    currForm[name].value = value
    currForm[name].errorMessage = ''

    if (name == 'province') {
      ;['city', 'district', 'postal_code']?.map((key) => {
        currForm[key as TKeyFormGeneralPersonalInfo].value = ''
      })
      currForm['city'].options = generateOptions({
        options:
          (
            await getListCity({
              province_code: value
            })
          )?.data || []
      })
    }

    if (name == 'city') {
      ;['district', 'postal_code']?.map((key) => {
        currForm[key as TKeyFormGeneralPersonalInfo].value = ''
      })
      currForm['district'].options = await generateOptions({
        options:
          (
            await getListDistrict({
              city_code: value
            })
          )?.data || []
      })
    }

    if (name == 'district') {
      const city_code = currForm['city']?.value
      const city_name = (currForm?.['city']?.options as TOption[])?.filter(
        (city) => city?.value === city_code
      )?.[0]?.label

      const district_name = (currForm?.['district']?.options as TOption[])?.filter(
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

      currForm['postal_code'].options = postalCodes
      currForm['postal_code'].value = postalCodes?.[0]?.value
      currForm['postal_code'].errorMessage = ''
    }

    if (['city', 'province', 'district']?.includes(name)) {
      formGeneralPersonalInfo['city'].disabled = !currForm.province.value
      formGeneralPersonalInfo['district'].disabled = !currForm.city.value
    }

    setFormGeneralInfoPersonalInfo({
      ...currForm
    })
  }, [])

  const handleOnSubmit = async (e: TEventSubmitForm) => {
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
        schema: socialLinkSchema(selectedSocialLink?.category?.name)
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
      console.log('personalInformation: ', results)
    }
  }

  return (
    <contextFormPersonalInfo.Provider
      value={{
        formGeneralPersonalInfo,
        listSelectedSocialLink,
        setListSelectedSocialLink,
        handleOnChangeFormGeneralPersonalInfo,
        handleOnSubmit
      }}
    >
      {children}
    </contextFormPersonalInfo.Provider>
  )
}

export default ContextFormPersonalInfo
