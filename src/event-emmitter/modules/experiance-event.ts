
import { TFormFilterExperiance } from '@components/modules/experiance/form-filter-experiance';

import { TFormExperiance } from "@lib/validation/module/experiance/experiance-schema";
import { TTypeActionModalForm } from "@typescript/global";

const EVENT_NAME_EXPERIANCE={
    SET_MODAL_FORM_EXPERIANCE: 'SET_MODAL_FORM_EXPERIANCE',
    SET_EXPERIANCE: 'SET_EXPERIANCE',
    SEARCH_DATA_TABLE_EXPERIANCE : 'SEARCH_DATA_TABLE_EXPERIANCE'

} as const

export type TEventMapExperiance = {
    [EVENT_NAME_EXPERIANCE.SET_MODAL_FORM_EXPERIANCE] : {
        isShow: boolean
        action: TTypeActionModalForm
    }
    [EVENT_NAME_EXPERIANCE.SET_EXPERIANCE] : TFormExperiance,
    [EVENT_NAME_EXPERIANCE.SEARCH_DATA_TABLE_EXPERIANCE] : TFormFilterExperiance

}

export default EVENT_NAME_EXPERIANCE