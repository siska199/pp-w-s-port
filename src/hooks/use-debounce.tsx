import { useEffect, useState } from 'react'

interface TProps {
  value: any
  delay?: number
}
const useDebounce = (props: TProps) => {
  const { value, delay = 1500 } = props
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      console.log('value berubah dia bakal clear timeout')
      clearTimeout(handler)
    }
  }, [value, delay])
  return debounceValue
}

export default useDebounce
