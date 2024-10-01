import Badge from "@components/ui/badge";
import Image from "@components/ui/image";
import { skillsByCategory } from "@lib/data/dummy";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SkillSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.1,
                duration: 0.3,
            },
        }),
        exit: {
            opacity: 0,
            y: 20,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <div className="min-h-[calc(100%-5rem)] text-white px-8 my-8 md:my-0 space-y-4 lg:space-y-2 flex flex-col items-center justify-center">
            <h3 className="text-heading-05 md:text-heading-03 text-center font-bold font-bubblegum-sans">Skill</h3>
            <div className="gap-4 w-full flex flex-col md:flex-row md:px-8 justify-center items-center h-full flex-grow">

                <div className="flex flex-wrap md:flex-col gap-4 border-b pb-4 md:pb-0 md:border-none">
                    {skillsByCategory?.map((catSkill, i) => (
                        <div
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className={`flex gap-4 cursor-pointer`}
                        >
                            <h5
                                className={`p-3 effect-split-bg cursor-pointer-custome h-fit rounded-md w-fit text-body-medium font-medium md:min-w-[10rem] ${
                                    i === activeIndex ? 'bg-split' : ''
                                }`}
                            >
                                {catSkill?.name}
                            </h5>
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <div className="p-4 md:p-8 flex flex-wrap m-auto justify-center items-center gap-4">
                        {skillsByCategory[activeIndex]?.skills.map((skill, j) => (
                            <motion.div
                                key={skill.name}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible" 
                                exit="exit"
                                custom={j} 
                                viewport={{ once: false }} 
                                className="bg-white/30 flex gap-4 items-center md:min-w-[8rem] text-white p-4 rounded-md"
                            >
                                <Image
                                    src={skill.url}
                                    className="aspect-square w-10 md:w-[3.5rem] rounded-full shadow-2xl"
                                />
                                <div className="flex flex-col gap-2">
                                    <p className="md:text-body-medium font-bold text-white">{skill.name}</p>
                                    <Badge className="" variant={"solid-blue"} label={"3+ Project"} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SkillSection;
