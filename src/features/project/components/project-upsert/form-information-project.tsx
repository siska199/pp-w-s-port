import React, { useContext } from 'react';

import { contextFormProject } from '@features/project/context/form-project-context';
import InputBase from '@components/ui/input/input-base';
import InputUploadFile from '@components/ui/input/input-file/input-file-v1';
import InputSelect from '@components/ui/input/input-select/input-select';
import InputTextArea from '@components/ui/input/input-text-area';
import ResponsibilityProjects from '@features/project/components/project-upsert/responsibility-project/responsibility-projects';
import ProjectMenus from '@features/project/components/project-upsert/project-menu/project-menus';
import Button from '@components/ui/button';
import Divider from '@components/ui/divider';

const FormInformationProject = () => {
    const { formInformationProject: form, handleOnChangeFormInformationProject: handleOnChange, isLoading, handleOnSubmitInformationProject: handleOnSubmit } = useContext(contextFormProject);

    return (
        <>
            <div className="grid grid-grid-cols-1 gap-2">
                <div className="grid grid-grid-cols-1 md:grid-cols-2 gap-4">
                    <InputBase {...form['name']} onChange={handleOnChange} />
                    <InputSelect {...form['category']} onChange={handleOnChange} />
                </div>
                <InputSelect {...form['id_skill_users']} onChange={handleOnChange} isMultiple />
                <div className="grid grid-grid-cols-1 md:grid-cols-2 gap-4">
                    <InputSelect {...form['type']} onChange={handleOnChange} />
                    <InputSelect {...form['id_experiance']} onChange={handleOnChange} />
                </div>
                <InputUploadFile {...form['thumbnail_image']} onChange={handleOnChange} />
                <InputTextArea {...form['description']} onChange={handleOnChange} />
                <Button onClick={handleOnSubmit} className="ml-auto mt-4" isLoading={isLoading}>
                    Save
                </Button>
            </div>
            {form.id.value && (
                <>
                    <Divider />
                    <ProjectMenus />
                    <ResponsibilityProjects />
                </>
            )}
        </>
    );
};

export default React.memo(FormInformationProject);
