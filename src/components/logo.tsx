import { HTMLProps } from "react";

interface TProps extends HTMLProps<HTMLDivElement>{
    
}

const Logo = (props: TProps ) => {
    const {...attrs} = props
    
    return(
        <div {...attrs} className={`text-body-3xl font-test font-bold font-circle-of-love ${attrs.className}` }>
           S-Port
        </div>
    )
};

export default Logo;
