import { TKeyMetricSchema } from "@features/personal-information/validations/key-metric-schema";
import { TTypeActionModalForm } from "@typescript/index-type";

export const EVENT_PERSONAL_INFO = {
    ON_VALIDATE_PERSONAL_INFO: 'ON_VALIDATE_PERSONAL_INFO',
    SET_MODAL_FORM_KEY_METRIC: 'SET_MODAL_FORM_KEYMETRICS',
    SET_KEY_METRIC: 'SET_KEY_METRIC',
} as const;

export type TEventMapPersonalInfo = {
    [EVENT_PERSONAL_INFO.ON_VALIDATE_PERSONAL_INFO]: boolean;

    [EVENT_PERSONAL_INFO.SET_MODAL_FORM_KEY_METRIC]: {
        isShow: boolean;
        action: TTypeActionModalForm;
    };
    [EVENT_PERSONAL_INFO.SET_KEY_METRIC]: TKeyMetricSchema;
};

export default EVENT_PERSONAL_INFO;
