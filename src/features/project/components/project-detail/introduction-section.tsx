import Button from '@components/ui/button';
import ContainerSection from '@components/ui/container/container-section';
import Image from '@components/ui/image';

const IntroductionSection = () => {
    return (
        <ContainerSection>
            <div className="space-y-4 my-auto ">
                <div className="">
                    <h3 className="font-bubblegum-sans mb-2">Garda Oto Akses | Frontend Developer</h3>
                    <p className="font-bold">PT Astra Internasional</p>
                    <p className="font-thin">11 April 2022 - 30 April 2023</p>
                </div>

                <p className="text-justify  ">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores, aut inventore? Excepturi accusantium labore neque dolor consectetur, quasi consequatur aliquam veniam ratione, ea
                    doloribus, earum quidem fuga ullam hic exercitationem quaerat expedita culpa amet asperiores? Unde alias maiores explicabo doloremque nobis asperiores, veniam consectetur aut
                    laborum nisi ipsam earum obcaecati?
                </p>

                <div className=" flex-col md:flex-row flex gap-4 ">
                    <Button variant={'solid-primary'} shape={'circle'} className="font-medium min-w-[10rem] flex gap-2">
                        <span className="-mt-1">📂</span>
                        {''} Code Repository
                    </Button>
                    <Button variant={'glass'} shape={'circle'} className="min-w-[10rem] font-medium !text-white hover:!bg-transparent ">
                        <span>🌐</span> View Demo
                    </Button>
                </div>
            </div>

            <div className="p-8 flex">
                <Image
                    customeClassName={{
                        image: 'object-cover zoom-out-effect',
                    }}
                    src="dummy-images/goa.png"
                    className="w-full my-auto h-auto aspect-video rounded-lg shadow-image-arise overflow-hidden "
                />
            </div>
        </ContainerSection>
    );
};

export default IntroductionSection;
