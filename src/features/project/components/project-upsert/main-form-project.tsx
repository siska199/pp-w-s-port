import FormGeneralProject from '@features/project/components/project-upsert/form-information-project';
import ProjectMenus from '@features/project/components/project-upsert/project-menu/project-menus';
import ResponsibilityProjects from '@features/project/components/project-upsert/responsibility-project/responsibility-projects';

const MainFromProject = () => {
    return (
        <div className="space-y-10 ">
            <FormGeneralProject />
            <ProjectMenus />
            <ResponsibilityProjects />
        </div>
    );
};

export default MainFromProject;
