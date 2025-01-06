import DOMPurify from 'dompurify'

interface TPropsDisplayInnerHMTL {
  html: string
}

const DisplayInnerHMTL = (props: TPropsDisplayInnerHMTL) => {
  const { html } = props
  return (
    <div
      className='container-list-disc-style'
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
    ></div>
  )
}

export default DisplayInnerHMTL
