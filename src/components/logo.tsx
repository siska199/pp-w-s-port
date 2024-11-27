import { HTMLProps } from 'react'

type TProps = HTMLProps<HTMLDivElement>

const Logo = (props: TProps) => {
  const { ...attrs } = props

  return (
    <div {...attrs} className={`text-body-3xl font-bold font-shaky-hand ${attrs.className}`}>
      S-Port {`</>`}
    </div>
  )
}

export default Logo
