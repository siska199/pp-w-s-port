
const AboutMeSection = () => {
  const listInformation = [
    {
      title : '3+',
      description : 'Years of experience',
    },
    {
      title : '8+',
      description : 'Company Projects completed',
    },
    {
      title : '10+',
      description : 'Personal Projects completed',
    },
    {
      title:'4+',
      description : 'Happy Customers',
    }
  ]
  return <div className=" min-h-[calc(100%-5rem)] text-white px-8 space-y-4 md:space-y-8 flex flex-col items-center justify-center">
    <h3 className="text-heading-05 md:text-heading-03 text-center font-bold font-bubblegum-sans">About Me</h3>
    <p className=" md:text-body-large text-white p-4 rounded-md bg-gray-50/30  ">Frontend Developer with 3+ years of experience specializing in React.js, Next.js, and TypeScript. Skilled in architecting scalable web applications from the ground up, including setting up folder and file structure, routing, protected routes, authorization, state management (Zustand, Redux, Context API), and API integrations using Axios. Expertise in component architecture, custom hooks, implementing Figma designs from UIUX, creating responsive layouts, and developing design systems using various CSS frameworks such as Tailwind, Bootstrap, and Styled Components. Proven ability to work collaboratively in a team, successfully delivering projects on tight deadlines. Eager to expand my skills in backend development to further enhance my capabilities in creating full-stack applications.</p>
    <div className="flex flex-col md:flex-row flex-wrap md:gap-4 justify-center">
      {
        listInformation?.map?.((info,i)=><CardInfo key={i} {...info}/>)
      }
    </div>
  </div>;
};

interface TPropsCardInfo {
  title       : string;
  description : string;
}

const CardInfo= (props:TPropsCardInfo)=>{
  const {title, description} = props
  return <div className="flex gap-1   items-center w-[17rem]  p-4   rounded-lg ">
    <h1 className="text-heading-05 md:text-heading-01 font-bold w-[5rem] md:w-auto ">{title}</h1>
    <p className="text-start text-white flex-grow">{description}</p>
  </div>
}

export default AboutMeSection;
