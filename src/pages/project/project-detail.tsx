import MenuSection from '@components/modules/project-detail/menu-section';
import Badge from '@components/ui/badge';
import Button from '@components/ui/button';
import Image from '@components/ui/image';

const ProjectDetailPage = () => {
  return (
    <>
      <div className="h-full relative bg-center bg-no-repeat bg-cover overflow-x-hidden">
        <div className="absolute top-0  !bg-opacity-60 w-full min-h-full h-full overflow-y-auto ">
          {/* Introduction */}
          <div className=" h-full space-y-4 grid grid-cols-2 px-16">
            <div className="space-y-4 my-auto ">
              <div className="">
                <h3 className="font-bubblegum-sans mb-2">Garda Oto Akses</h3>
                <p className="font-bold">PT Astra Internasional</p>
                <p className="font-thin">11 April 2022 - 30 April 2023</p>
              </div>

              <p className="text-justify  ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Dolores, aut inventore? Excepturi accusantium labore neque dolor
                consectetur, quasi consequatur aliquam veniam ratione, ea
                doloribus, earum quidem fuga ullam hic exercitationem quaerat
                expedita culpa amet asperiores? Unde alias maiores explicabo
                doloremque nobis asperiores, veniam consectetur aut laborum nisi
                ipsam earum obcaecati?
              </p>

              <div className="flex gap-4 ">
                <Button
                  variant={'solid-primary'}
                  shape={'circle'}
                  className="font-medium min-w-[10rem] flex gap-2"
                >
                  Code Repository
                </Button>
                <Button
                  variant={'glass'}
                  shape={'circle'}
                  className="min-w-[10rem] font-medium !text-white hover:!bg-transparent "
                >
                  Demo
                </Button>
              </div>
            </div>

            <div className="p-8 flex">
              <Image
                customeClassName={{
                  image: 'object-cover hover:scale-125 ease-in duration-150',
                }}
                src="dummy-images/goa.png"
                className="w-full my-auto h-auto aspect-video rounded-lg shadow-image-arise overflow-hidden "
              />
            </div>
          </div>

          <MenuSection />

          <div className="h-full w-full px-16 py-8">
            <h3 className="font-bubblegum-sans">Responsibility</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailPage;
