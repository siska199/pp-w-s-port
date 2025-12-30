import FormGeneralProject from '@features/project/components/project-upsert/form-information-project';
import LinkProjects from '@features/project/components/project-upsert/project-link/link-projects';
import ProjectMenus from '@features/project/components/project-upsert/project-menu/project-menus';
import ResponsibilityProjects from '@features/project/components/project-upsert/responsibility-project/responsibility-projects';

const MainFromProject = () => {
    return (
        <div className="space-y-10 ">
            <FormGeneralProject />
            <ProjectMenus />
            <ResponsibilityProjects />
            <LinkProjects />
        </div>
    );
};

export default MainFromProject;
