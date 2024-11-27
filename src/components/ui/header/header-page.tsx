import Header, { THeaderProps } from '@components/ui/header/header'

type TProps = THeaderProps
const HeaderPage = (props: TProps) => {
  return <Header {...props} />
}

export default HeaderPage
