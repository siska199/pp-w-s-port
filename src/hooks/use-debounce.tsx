import { useEffect, useState } from 'react'


interface TProps {
    value :any,
    delay? : number
}
const useDebounce = (props:TProps) => {
    const {value, delay=1500} =props
    const [debounceValue, setDebounceValue] = useState(value)
    useEffect(()=>{
        const handler = setTimeout(()=>{
            setDebounceValue(value)
        },delay)

        return ()=>{
            clearTimeout(handler)
        }
    },[value,delay])
    return debounceValue
}

export default useDebounce