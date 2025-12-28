import { toCapitalize } from '@lib/helper/function';

const appMessage = {
    systemErrorMessage: 'Telah terjadi kesalahan pada pada sistem, silahkan contact admin apilikasi',
    warning: {
        deleteData: 'Are you sure you want to delete this data?',
    },
    selectInputPlaceolder: (name: string) => `Select a ${toCapitalize(name)}`,
    upsertModule: (id: string, moduleName: string) => ({
        sucess: `Success ${id ? 'update' : 'add'} ${moduleName}`,
        error: `Failed ${id ? 'update' : 'add'} ${moduleName}`,
    }),
    deleteModule: (moduleName: string) => ({
        sucess: `Success delete ${moduleName}`,
        error: `Failed delete ${moduleName}`,
    }),
};
export default appMessage;
