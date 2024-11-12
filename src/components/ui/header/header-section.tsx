interface TProps {
  title?: string
}

const HeaderSection = (props: TProps) => {
  const { title } = props
  return title ? (
    <h3 className=' text-heading-05 md:text-heading-03 text-center font-bubblegum-sans capitalize '>
      {title}
    </h3>
  ) : null
}

export default HeaderSection
