import { HTMLProps } from "react";

interface TProps extends HTMLProps<HTMLDivElement>{
    
}

const Logo = (props: TProps ) => {
    const {...attrs} = props
    
    return(
        <div {...attrs} className={`text-body-3xl font-shaky-hand font-bold font-bubblegum-sans ${attrs.className}` }>
           S-Port {`</>`}
        </div>
    )
};

export default Logo;
