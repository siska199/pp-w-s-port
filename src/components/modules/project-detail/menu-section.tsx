import ContainerSection from '@components/ui/container/container-section';
import Image from '@components/ui/image';
import Slider3D from '@components/ui/slider-3d';

const MenuSection = () => {
  const listImage = [
    'dummy-images/project-goa/1.png',
    'dummy-images/project-goa/2.png',
    'dummy-images/project-goa/3.png',
    'dummy-images/project-goa/4.png',
    'dummy-images/project-goa/1.png',
    'dummy-images/project-goa/2.png',
  ];

  const listFeatures = [
    'Create Form Registration',
    'Add Data Bengkel',
    'Edit Data bengkerl',
  ];
  return (
    <ContainerSection title="Menu">
      <Slider3D images={listImage} />

      <div className="space-y-4 w-full">
        <div className="space-y-2">
          <h4>Menu Login</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero vitae
            temporibus quasi minus natus maxime optio eaque doloremque inventore
            non, officia dignissimos sed ex ipsa asperiores facilis ea iure,
            itaque neque magni exercitationem hic ut fugiat eveniet! Assumenda
            dolores nihil, quo debitis suscipit facere. Facere voluptatum
            repudiandae.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-body-large font-medium">Related Image</p>
          <div className="flex gap-4">
            {listImage?.map((image, i) => (
              <Image key={i} src={image} className="w-[10rem] rounded-md" />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-body-large font-medium">Features:</p>
          <ul className="flex flex-col gap-2">
            {listFeatures?.map((feature, i) => (
              <li key={i}>
                {'-'} {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ContainerSection>
  );
};

export default MenuSection;
