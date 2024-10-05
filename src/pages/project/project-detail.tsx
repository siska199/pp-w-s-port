import Badge from '@components/ui/badge';
import Button from '@components/ui/button';
import Image from '@components/ui/image';

const ProjectDetailPage = () => {
  return (
    <>
      <div
        className="h-full relative bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url('/src/assets/images/dummy-images/project-goa/thumbnail-goa.png')`,
        }}
      >
        <div className="absolute top-0 bg-glassmorphism !bg-opacity-60 w-full min-h-full h-full overflow-y-auto ">
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
                  variant={'outline-white'}
                  shape={'circle'}
                  className="min-w-[10rem] font-medium !text-white hover:!bg-transparent "
                >
                  Demo
                </Button>
              </div>
            </div>
          </div>

          <div className="px-16 py-8 space-y-8 min-h-full h-full ">
            <h3 className="font-bubblegum-sans">Feature That Build</h3>
            <div className="flex  gap-16 h-auto justify-between">
              <div className="flex-grow flex-[0.55] flex justify-center ">
                <Image
                  className="w-full h-auto aspect-video rounded-lg shadow-image-arise"
                  src="dummy-images/project-goa/1.png"
                  overlay={{
                    content: (
                      <div className="p-8 h-full flex flex-col justify-center">
                        <h5 className="">Menu Login</h5>
                        <p>
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Doloribus fugit officiis nulla? Nobis sit
                          dolorum fugiat porro dolore nemo sapiente.
                        </p>
                      </div>
                    ),
                    withBackdrop: true,
                  }}
                />
              </div>
              <div className="flex-[0.45] flex overflow-x-scroll gap-8 mt-auto scrollbar-hidden">
                <Image
                  className="shadow-image-arise min-w-[15rem] h-[10rem] aspect-video rounded-lg cursor-pointer-custome"
                  src="dummy-images/project-goa/1.png"
                  overlay={{
                    content: (
                      <div className="p-8 h-full flex flex-col justify-center items-center">
                        <Badge label={'Menu Login'} variant={'solid-white'} />
                      </div>
                    ),
                    withBackdrop: true,
                  }}
                />
                <Image
                  className="shadow-image-arise min-w-[15rem] h-[10rem] aspect-video rounded-lg cursor-pointer-custome"
                  src="dummy-images/project-goa/2.png"
                  overlay={{
                    content: (
                      <div className="p-8 h-full flex flex-col justify-center items-center">
                        <Badge label={'Menu Login'} variant={'solid-white'} />
                      </div>
                    ),
                    withBackdrop: true,
                  }}
                />
                <Image
                  className="shadow-image-arise min-w-[15rem] h-[10rem] aspect-video rounded-lg cursor-pointer-custome"
                  src="dummy-images/project-goa/3.png"
                  overlay={{
                    content: (
                      <div className="p-8 h-full flex flex-col justify-center items-center">
                        <Badge label={'Menu Login'} variant={'solid-white'} />
                      </div>
                    ),
                    withBackdrop: true,
                  }}
                />
                <Image
                  className="shadow-image-arise min-w-[15rem] h-[10rem] aspect-video rounded-lg cursor-pointer-csutome"
                  src="dummy-images/project-goa/4.png"
                  overlay={{
                    content: (
                      <div className="p-8 h-full flex flex-col justify-center items-center">
                        <Badge label={'Menu Login'} variant={'solid-white'} />
                      </div>
                    ),
                    withBackdrop: true,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="h-full w-full px-16 py-8">
            <h3 className="font-bubblegum-sans">Responsibility</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailPage;
