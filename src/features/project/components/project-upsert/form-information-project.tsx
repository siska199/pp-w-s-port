import React, { useContext } from 'react';

import LinkProjects from '@features/project/components/project-upsert/project-link/link-projects';
import ProjectMenus from '@features/project/components/project-upsert/project-menu/project-menus';
import ResponsibilityProjects from '@features/project/components/project-upsert/responsibility-project/responsibility-projects';
import { contextFormProject } from '@features/project/context/form-project-context';
import Button from '@components/ui/button';
import Divider from '@components/ui/divider';
import InputBase from '@components/ui/input/input-base';
import InputCheckbox from '@components/ui/input/input-checkbox';
import InputDate from '@components/ui/input/input-date';
import InputUploadFile from '@components/ui/input/input-file/input-file-v1';
import InputSelect from '@components/ui/input/input-select/input-select';
import InputTextArea from '@components/ui/input/input-text-area';

const FormInformationProject = () => {
    const { formInformationProject: form, handleOnChangeFormInformationProject: handleOnChange, isLoading, handleOnSubmitInformationProject: handleOnSubmit } = useContext(contextFormProject);

    return (
        <>
            <div className="grid grid-grid-cols-1 gap-2">
                <div className="grid grid-grid-cols-1 md:grid-cols-2 gap-4">
                    <InputBase {...form['name']} onChange={handleOnChange} />
                    <InputSelect {...form['category']} onChange={handleOnChange} />
                </div>
                <div className="grid grid-grid-cols-1 md:grid-cols-2 gap-4">
                    <InputSelect {...form['id_skill_users']} onChange={handleOnChange} isMultiple />
                    <InputSelect {...form['id_profession']} onChange={handleOnChange} />{' '}
                </div>
                <div className="grid grid-grid-cols-1 md:grid-cols-2 gap-4">
                    <InputSelect {...form['type']} onChange={handleOnChange} />
                    <InputSelect {...form['id_experiance']} onChange={handleOnChange} />
                </div>
                <div className="grid grid-grid-cols-1 md:grid-cols-2 gap-4">
                    <InputDate {...form['start_at']} onChange={handleOnChange} />
                    <InputDate {...form['end_at']} minDate={form.start_at.value ?? undefined} onChange={handleOnChange} />
                </div>
                <InputUploadFile {...form['thumbnail_image']} onChange={handleOnChange} />
                <InputTextArea {...form['description']} onChange={handleOnChange} />
                <InputCheckbox {...form['is_show_project']} onChange={handleOnChange} />
                <Button onClick={handleOnSubmit} className="ml-auto mt-4 md:min-w-[8rem]" isLoading={isLoading}>
                    Save
                </Button>
            </div>
            {form.id.value && (
                <>
                    <Divider />
                    <ProjectMenus />
                    <ResponsibilityProjects />
                    <LinkProjects />
                </>
            )}
        </>
    );
};

export default React.memo(FormInformationProject);
