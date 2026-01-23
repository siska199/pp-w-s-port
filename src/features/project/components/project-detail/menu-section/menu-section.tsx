import { useContext, useMemo } from 'react';
import { SwiperClass } from 'swiper/react';

import SliderRelatedImageMenu from '@features/project/components/project-detail/menu-section/slider-related-image-menu';
import { contextProject } from '@features/project/context/context-project';
import ContainerSection from '@components/ui/container/container-section';
import Image from '@components/ui/image';
import SliderImage3D from '@components/ui/slider/slider-image-3d';

import { useAppDispatch } from '@store/store';
import { handleSetModal } from '@store/ui-slice';

const MenuSection = () => {
    const { project: data, acitiveMenuIndex, setActiveMenuIndex } = useContext(contextProject);

    const currentProject = useMemo(() => {
        return data?.project_menus?.[acitiveMenuIndex as number];
    }, [acitiveMenuIndex]);
    const relatedImages = currentProject?.related_images?.map((image) => image?.image);

    const handleOnChangeSlide = (swiper: SwiperClass) => {
        setActiveMenuIndex(swiper.realIndex);
    };

    if (!data || data?.project_menus?.length === 0) return null;

    return (
        <ContainerSection title="Menu" className=" ">
            <SliderImage3D
                images={data?.project_menus?.map((image) => image?.main_image) as string[]}
                onClick={handleOnChangeSlide}
                onSlideChange={handleOnChangeSlide}
                swiperSlideProps={{
                    className: `min-w-auto md:min-h-[20rem] min-w-[20rem] max-w-[25rem] md:min-w-[40rem] md:max-w-[40rem] rounded-lg overflow-hidden`,
                }}
            />

            <div className="lg:-mt-[0rem] space-y-4 w-full">
                <CardIntroMenu title={currentProject?.name} description={currentProject?.description} />
                <ListRelatedImageMenu images={relatedImages} />
                <ListFeature features={[]} />
            </div>
        </ContainerSection>
    );
};

interface TCardIntroMenu {
    title: string;
    description: string;
}
const CardIntroMenu = (props: TCardIntroMenu) => {
    const { title, description } = props;
    return (
        <div className="space-y-2">
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
    );
};

interface TPropsRelatedImagesMenu {
    images: string[];
}

const ListRelatedImageMenu = (props: TPropsRelatedImagesMenu) => {
    const { images } = props;
    const dispatch = useAppDispatch();
    const handleOnClickMenu = (index: number) => {
        dispatch(
            handleSetModal({
                isShow: true,
                children: <SliderRelatedImageMenu listImage={images} activeIndex={index} />,
                customeClass: {
                    mdBody: 'scrollbar-hidden',
                    mdContent: 'bg-white/0  h-[90vh]',
                    btnClose: {
                        icon: '!w-[2rem] !h-[2rem] icon-white',
                    },
                },
            }),
        );
    };
    return (
        <>
            <div className="space-y-2">
                <p className="text-body-large font-medium">Related Image</p>
                <div className="flex gap-4 overflow-x-auto pt-2 overflow-y-visible pb-8 pr-4">
                    {images?.map((image, i) => (
                        <Image onClick={() => handleOnClickMenu(i)} key={i} src={image} className=" object-cover max-w-[5rem] max-h-[10rem] !aspect-square zoom-out-effect cursor-pointer rounded-md" />
                    ))}
                </div>
            </div>
        </>
    );
};

interface TPorpsListFeature {
    features: string[];
}
const ListFeature = (props: TPorpsListFeature) => {
    const { features } = props;

    return (
        <div className="space-y-2">
            <p className="text-body-large font-medium">Features:</p>
            <ul className="flex flex-col gap-4">
                {features?.map((feature, i) => (
                    <li key={i}>
                        {'-'} {feature}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuSection;
