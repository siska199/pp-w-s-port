import { createContext, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventEmitter } from '@event-emitters';

import usePersonalInformationAPI from '@features/personal-information/apis/use-personal-information-api';
import EVENT_PERSONAL_INFO from '@features/personal-information/event-emitters/personal-info-event';
import { TKeyMetric, TSelectedSocialLink } from '@features/personal-information/types/personal-information-types';
import generalPersonalInfoSchema, {
    initialFormGeneralPersonalInfo,
    TFormGeneralPersonalInfo,
    TGeneralPersonalInfoSchema,
} from '@features/personal-information/validations/general-personal-info-schema';
import socialLinkSchema from '@features/personal-information/validations/social-link-schema';
import useMasterAPI from '@apis/use-master-api';

import useFile from '@hooks/use-file';
import { useAppDispatch } from '@store/store';
import { handleSetAlertConfig, handleSetIsloading } from '@store/ui-slice';
import {
    extractValueFromForm,
    formatPhoneNumber,
    generateOptions,
    mapErrorMessagePromiseAll,
    mappingErrorsToForm,
    mappingValuesToForm,
    mergeArraysOfObjects,
    TParamsMapErrorMessagePromiseAll,
} from '@lib/helper/function';
import { TEventOnChange, TEventSubmitForm } from '@typescript/ui-types';

interface TStateFormPersonalInfo {
    formGeneralPersonalInfo: TFormGeneralPersonalInfo;
    listSelectedSocialLink: TSelectedSocialLink[];
    listKeyMetric: TKeyMetric[];
    setListKeyMetric: React.Dispatch<React.SetStateAction<TKeyMetric[]>>;
    setListSelectedSocialLink: React.Dispatch<React.SetStateAction<TSelectedSocialLink[]>>;
    handleOnChangeFormGeneralPersonalInfo: (e: TEventOnChange) => void;
    handleOnSubmit: (e: TEventSubmitForm) => void;
    isLoading: boolean;
}

const intialStateFormPersonalInformation = {
    formGeneralPersonalInfo: initialFormGeneralPersonalInfo,
    listSelectedSocialLink: [],
    listKeyMetric: [],
    setListKeyMetric: () => null,
    setListSelectedSocialLink: () => null,
    handleOnChangeFormGeneralPersonalInfo: () => null,
    handleOnSubmit: (_e: TEventSubmitForm) => null,
    isLoading: false,
};

export const contextFormPersonalInfo = createContext<TStateFormPersonalInfo>(intialStateFormPersonalInformation);

const ContextFormPersonalInfo = (props: { children: React.ReactNode }) => {
    const { children } = props;
    const navigate = useNavigate();
    const { upsertPersonalInformation, upsertBulkSocialLink, upsertBulkKeyMetric,getDetailPersonalInformation, getListKeyMetric } = usePersonalInformationAPI();
    const { getListMasterProvince, getListMasterCity, getListMasterDistrict, getListMasterProfession, getListMasterPostalCode } = useMasterAPI();
    const dispatch = useAppDispatch();
    const { handleGetFileFromUrl } = useFile();

    const [listKeyMetric, setListKeyMetric] = useState<TKeyMetric[]>([]);
    const [listSelectedSocialLink, setListSelectedSocialLink] = useState<TSelectedSocialLink[]>([]);
    const [formGeneralPersonalInfo, setFormGeneralInfoPersonalInfo] = useState(intialStateFormPersonalInformation.formGeneralPersonalInfo);
    const [isLoading, setIsLoading] = useState(false);
    type TKeyFormGeneralPersonalInfo = keyof typeof formGeneralPersonalInfo;

    useEffect(() => {
        handleInitialData();
        return () => {
            setFormGeneralInfoPersonalInfo({ ...initialFormGeneralPersonalInfo });
        };
    }, []);

    const handleInitialData = async () => {
        dispatch(handleSetIsloading(true));

        try {
            let updatedFormGeneralPersonalInfo = formGeneralPersonalInfo;
            updatedFormGeneralPersonalInfo['id_province'].options = generateOptions({
                options: (await getListMasterProvince())?.data || [],
            });
            updatedFormGeneralPersonalInfo['id_profession'].options = generateOptions({
                options: (await getListMasterProfession())?.data || [],
            });

            const resultPersonalInfo = await getDetailPersonalInformation();
            if (resultPersonalInfo?.data) {
                updatedFormGeneralPersonalInfo = mappingValuesToForm({
                    form: formGeneralPersonalInfo,
                    values: resultPersonalInfo?.data,
                });

                updatedFormGeneralPersonalInfo['id_city'].options = await handleMappingOptionsCity({
                    id_province: resultPersonalInfo?.data?.id_province,
                });
                updatedFormGeneralPersonalInfo['id_city'].disabled = false;

                updatedFormGeneralPersonalInfo['id_district'].options = await handleMappingOptionsDistrict({
                    id_city: resultPersonalInfo?.data?.id_city,
                });
                updatedFormGeneralPersonalInfo['id_district'].disabled = false;

                updatedFormGeneralPersonalInfo['id_postal_code'].options = await handleMappingOptionsPostalCode({
                    id_district: resultPersonalInfo?.data?.id_district,
                });
                updatedFormGeneralPersonalInfo['id_postal_code'].disabled = false;

                updatedFormGeneralPersonalInfo['professional_image'].value = await handleGetFileFromUrl({
                    url: resultPersonalInfo?.data?.professional_image,
                    filename: 'professional-image',
                });
                updatedFormGeneralPersonalInfo['resume'].value = await handleGetFileFromUrl({
                    url: resultPersonalInfo?.data?.resume,
                    filename: 'resume',
                });
            }

            setFormGeneralInfoPersonalInfo({ ...updatedFormGeneralPersonalInfo });

            const resultListKeyMetric = await getListKeyMetric();
            setListKeyMetric(resultListKeyMetric.data || []);
        } catch (error: any) {
            console.log('error: ', error?.message);
        } finally {
            dispatch(handleSetIsloading(false));
        }
    };

    type TExtractKeyPersonalInfo<TKey> = Extract<TKeyFormGeneralPersonalInfo, TKey>[];

    const handleOnChangeFormGeneralPersonalInfo = useCallback(async (e: TEventOnChange) => {
        const currForm = formGeneralPersonalInfo;
        const name = e.target.name as TKeyFormGeneralPersonalInfo;
        const value = e.target.value;
        currForm[name].value = value;
        currForm[name].errorMessage = '';

        if (name == 'id_province') {
            const keys = ['id_city', 'id_district', 'id_postal_code'] as TExtractKeyPersonalInfo<'id_city' | 'id_district' | 'id_postal_code'>;

            keys?.map((key) => {
                currForm[key].value = '';
                currForm[key].disabled = key === 'id_city' ? !value : !value ? true : currForm[key].disabled;
            });
            currForm['id_city'].options = await handleMappingOptionsCity({ id_province: value });
        }

        if (name == 'id_city') {
            const keys = ['id_district', 'id_postal_code'] as TExtractKeyPersonalInfo<'id_district' | 'id_postal_code'>;

            keys?.map((key) => {
                currForm[key].value = '';
                currForm[key].disabled = key === 'id_district' ? !value : !value ? true : currForm[key].disabled;
            });
            currForm['id_district'].options = await handleMappingOptionsDistrict({ id_city: value });
        }

        if (name == 'id_district') {
            currForm['id_postal_code'].value = '';
            currForm['id_postal_code'].disabled = !value;
            currForm['id_postal_code'].errorMessage = '';

            currForm['id_postal_code'].options = await handleMappingOptionsPostalCode({
                id_district: value,
            });
        }

        setFormGeneralInfoPersonalInfo({
            ...currForm,
        });
    }, []);

    const handleOnSubmit = async (e: TEventSubmitForm) => {
        dispatch(handleSetIsloading(true));
        setIsLoading(true);
        try {
            e?.preventDefault();
            const { isValid: isValidFormGeneralInfo, form: updatedFormGeneralInfo } = mappingErrorsToForm<TGeneralPersonalInfoSchema, typeof formGeneralPersonalInfo>({
                form: formGeneralPersonalInfo,
                schema: generalPersonalInfoSchema,
            });

            eventEmitter.emit(EVENT_PERSONAL_INFO.ON_VALIDATE_PERSONAL_INFO, listSelectedSocialLink?.length > 0);

            let isValidFormListSelectedSocialLink = !(listSelectedSocialLink?.length == 0);
            const updateListSelectedSocialLink = listSelectedSocialLink?.map((selectedSocialLink) => {
                const form = {
                    url: {
                        name: 'url',
                        value: selectedSocialLink.value,
                        errorMessage: '',
                    },
                };

                const { isValid, form: updatedForm } = mappingErrorsToForm({
                    form,
                    schema: socialLinkSchema(selectedSocialLink?.name),
                });

                if (!isValid) isValidFormListSelectedSocialLink = false;
                return {
                    ...selectedSocialLink,
                    errorMessage: updatedForm?.url?.errorMessage,
                };
            });

            const isValidFormListKeyMetric = !(listKeyMetric?.length == 0);

            setListSelectedSocialLink([...updateListSelectedSocialLink]);
            setFormGeneralInfoPersonalInfo({ ...updatedFormGeneralInfo });

            if (isValidFormGeneralInfo && isValidFormListSelectedSocialLink && isValidFormListKeyMetric) {
                const personalInformation = {
                    ...extractValueFromForm({ ...formGeneralPersonalInfo }),
                };
                const socialLinks = listSelectedSocialLink?.map((selectedSocliaLink) => ({
                    id_category: selectedSocliaLink.id_category,
                    id: selectedSocliaLink?.id,
                    url: selectedSocliaLink?.value,
                }));

                const results = await Promise.all([
                    upsertPersonalInformation({
                        ...personalInformation,
                        phone_number: formatPhoneNumber(personalInformation.phone_number),
                    }),
                    upsertBulkSocialLink(socialLinks),
                    upsertBulkKeyMetric(listKeyMetric)
                ]);

                const errorMessage = mapErrorMessagePromiseAll(
                    mergeArraysOfObjects(results, [
                        { moduleName: 'General Personal Information' },
                        {
                            moduleName: 'Social Link',
                        },
                    ]) as TParamsMapErrorMessagePromiseAll,
                );

                const isSuccess = results?.every((result) => result?.status);
                dispatch(
                    handleSetAlertConfig({
                        show: true,
                        message: errorMessage,
                        type: isSuccess ? 'sucess' : 'error',
                        withIcon: true,
                    }),
                );

                isSuccess &&
                    setTimeout(() => {
                        navigate(0);
                    }, 3000);
            }
        } catch (error: any) {
            console.log('error: ', error?.message);
        } finally {
            setIsLoading(false);
            dispatch(handleSetIsloading(false));
        }
    };

    const handleMappingOptionsCity = async (params: { id_province: string }) => {
        const { id_province } = params;
        const options = id_province
            ? await generateOptions({
                  options:
                      (
                          await getListMasterCity({
                              id_province: id_province,
                          })
                      )?.data || [],
              })
            : [];

        return options;
    };

    const handleMappingOptionsDistrict = async (params: { id_city: string }) => {
        const { id_city } = params;
        const options = id_city
            ? await generateOptions({
                  options:
                      (
                          await getListMasterDistrict({
                              id_city: id_city,
                          })
                      )?.data || [],
              })
            : [];
        return options;
    };

    const handleMappingOptionsPostalCode = async (params: { id_district: string }) => {
        const { id_district } = params;
        const options = id_district
            ? (await generateOptions({
                  options:
                      (
                          await getListMasterPostalCode({
                              id_district: id_district,
                          })
                      )?.data || [],
                  listSaveField: ['postal_code'],
              })?.map((data: any) => ({
                  label: `${data.postal_code}-(${data?.label})`,
                  value: data?.value,
              }))) || []
            : [];

        return options;
    };

    return (
        <contextFormPersonalInfo.Provider
            value={{
                formGeneralPersonalInfo,
                listSelectedSocialLink,
                setListSelectedSocialLink,
                handleOnChangeFormGeneralPersonalInfo,
                handleOnSubmit,
                isLoading,
                listKeyMetric,
                setListKeyMetric,
            }}
        >
            {children}
        </contextFormPersonalInfo.Provider>
    );
};

export default ContextFormPersonalInfo;
