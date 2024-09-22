interface TPropsGlobalLayout {
  children: React.ReactNode
}

const GlobalLayout = (props: TPropsGlobalLayout) => {
  const { children } = props
  return <div>{children}</div>
}

export default GlobalLayout
