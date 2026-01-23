import { useContext } from 'react';
import { motion } from 'framer-motion';

import { contextPortfolio, EPortfolioLoading } from '@features/portofolio/context/context-portofolio';
import AnimatedText from '@components/ui/animated/animated-text';
import Button from '@components/ui/button';
import Container from '@components/ui/container/container';
import ContainerSection from '@components/ui/container/container-section';
import Image from '@components/ui/image';

import { useFetchOnView } from '@hooks/use-fetch-on-view';
import useMediaQuery from '@hooks/use-media-query';
import { useAppDispatch } from '@store/store';
import { handleSetIsloading } from '@store/ui-slice';
import { IconDownload } from '@assets/icons';
import { opacityAnimation } from '@assets/styles/animation';

const HeroSection = () => {
    const { isLoading, personalInformation: data, socialLinkList, getPersonalInformation, getSocialLinkList } = useContext(contextPortfolio);
    const dispatch = useAppDispatch();

    const { ref } = useFetchOnView({
        fetcher: async () => {
            await getPersonalInformation();
            await getSocialLinkList();
            dispatch(handleSetIsloading(false));
        },
    });
    const { isMaxMd } = useMediaQuery();

    return (
        <ContainerSection ref={ref} gap="xl" className="mt-10 md:mt-0  min-h-screen !p-8">
            {isLoading[EPortfolioLoading.PERSONAL_INFORMATION] ? (
                <h5 className="my-auto text-body-large">Loading Hero Section...</h5>
            ) : (
                <>
                    <Container gap="base" className="w-auto overflow-x-visible ">
                        <AnimatedText text={`I'm ${data?.first_name} ${data?.last_name}`} className="!text-heading-05 text-center md:text-start mx-auto md:mx-0 " />

                        <AnimatedText text={data?.profession?.name || ''} className="font-bubblegum-sans text-center md:text-start" />

                        {isMaxMd && (
                            <motion.div {...opacityAnimation()} className="m-auto">
                                <Image
                                    className="mt-8 animate-bounce-custome  mx-auto rounded-full md:rounded-none w-[10rem] md:w-[25rem] aspect-square bg-transparent"
                                    src={data?.professional_image || ''}
                                />
                            </motion.div>
                        )}

                        <motion.div {...opacityAnimation()}>
                            <Container variant={'vcc'} className="md:items-start" gap="base">
                                <AnimatedText text={data?.bio || ''} className="ml-1 text-center md:text-start italic text-body-large font-normal " />
                                <Button to={data?.resume} target={'_blank'} shape={'circle'} variant={'glass'} className="font-bold ">
                                    <IconDownload className="icon-white" /> Download Resume
                                </Button>

                                <Container variant="hcc" className="justify-center md:justify-start gap-2">
                                    {socialLinkList?.map((socialAcc, i) => (
                                        <Button to={socialAcc.url} target={'_blank'} key={i} className="!p-2" variant={'soft-primary'}>
                                            <Image className="w-6 aspect-square rounded-full" src={socialAcc.category.image} />
                                        </Button>
                                    ))}
                                </Container>
                            </Container>
                        </motion.div>
                    </Container>
                    <motion.div {...opacityAnimation()} className="hidden md:flex w-full md:w-auto">
                        <Image
                            className="animate-waved-border mx-auto rounded-full md:rounded-none w-[10rem] md:w-[25rem] aspect-square bg-transparent"
                            customeClassName={{ image: 'object-center' }}
                            src={data?.professional_image || ''}
                        />
                    </motion.div>
                </>
            )}
        </ContainerSection>
    );
};

export default HeroSection;
