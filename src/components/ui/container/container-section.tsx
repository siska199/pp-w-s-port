import Container, { TPropsContainer } from '@components/ui/container/container'
import HeaderSection from '@components/ui/header/header-section'

interface TProps extends TPropsContainer {
  children: React.ReactNode
  title?: string
}

const ContainerSection = (props: TProps) => {
  const { children, className, title, ...attrs } = props
  return (
    <Container
      gap='base'
      variant={title ? 'vcc' : 'hcc'}
      className={`p-8 md:p-16  ${className}`}
      {...attrs}
    >
      <HeaderSection title={title} />
      {children}
    </Container>
  )
}

export default ContainerSection
