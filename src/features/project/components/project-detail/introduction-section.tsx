import { useContext } from 'react';

import { contextProject } from '@features/project/context/context-project';
import Button from '@components/ui/button';
import Container from '@components/ui/container/container';
import ContainerSection from '@components/ui/container/container-section';
import Image from '@components/ui/image';

import { formatDate } from '@lib/helper/function';
import { TTypeDateFormat } from '@typescript/ui-types';

const IntroductionSection = () => {
    const { project: data } = useContext(contextProject);

    return (
        <ContainerSection className="mt-10 md:mt-0   min-h-screen !p-8">
            {!data?.id ? (
                <h5 className="my-auto text-body-large ">Loading Introduction...</h5>
            ) : (
                <Container gap="base" className="w-auto flex-col-reverse flex-wrap md:flex-row overflow-x-hidden">
                    <>
                        <div className="space-y-4 my-auto ">
                            <div className="">
                                <h3 className="font-bubblegum-sans mb-2">
                                    {data?.name} | {data?.profession?.name}
                                </h3>
                                <p className="font-bold">{data?.experiance?.company_name}</p>
                                <p className="font-thin">
                                    {' '}
                                    {formatDate({ date: data?.start_at, format: TTypeDateFormat['DD MONTH YEAR'] })} | {formatDate({ date: data?.end_at, format: TTypeDateFormat['DD MONTH YEAR'] })}
                                </p>
                            </div>

                            <p className="text-justify  ">{data?.description}</p>

                            <div className=" flex-col md:flex-row flex gap-4 ">
                                {data?.project_links?.map((link) => (
                                    <Button key={link.id} variant={'solid-primary'} href={link.url} target="_blank" shape={'circle'} className="font-medium min-w-[10rem] flex gap-2">
                                        {link?.label}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="lg:p-8 flex">
                            <Image
                                customeClassName={{
                                    image: 'object-cover zoom-out-effect',
                                }}
                                src={data?.thumbnail_image}
                                className="my-auto h-auto aspect-video rounded-lg shadow-image-arise overflow-hidden w-[10rem] md:w-[40rem] "
                            />
                        </div>
                    </>
                </Container>
            )}
        </ContainerSection>
    );
};

export default IntroductionSection;
