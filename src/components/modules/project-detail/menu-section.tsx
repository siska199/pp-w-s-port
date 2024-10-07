import ContainerSection from '@components/ui/container/container-section';
import Slider3D from '@components/ui/slider-3d';

const MenuSection = () => {
  return (
    <ContainerSection title="Menu">
      <Slider3D
        images={[
          'dummy-images/project-goa/1.png',
          'dummy-images/project-goa/2.png',
          'dummy-images/project-goa/3.png',
          'dummy-images/project-goa/4.png',
          'dummy-images/project-goa/5.png',
          'dummy-images/project-goa/6.png',
        ]}
      />
    </ContainerSection>
  );
};

export default MenuSection;
