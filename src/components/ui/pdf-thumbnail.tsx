import { useEffect, useRef, useState } from 'react'
import { Document, DocumentProps, Page } from 'react-pdf'

interface TProps extends DocumentProps {
  customeClass?: {
    container: string
  }
  onClick?: () => void
}

const PDFThumbnail = (props: TProps) => {
  const { onClick, ...attrsDocument } = props
  const [containerSize, setContainerSize] = useState({ width: 0 })

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth
      setContainerSize({
        width: containerWidth
      })
    }
  }, [])

  return (
    <div
      className={`border overflow-hidden flex items-center justify-center ${props.customeClass?.container || ''}`}
      ref={containerRef}
      onClick={onClick}
    >
      {containerSize.width > 0 && (
        <Document {...attrsDocument}>
          <Page pageNumber={1} width={containerSize.width} renderTextLayer={false} />
        </Document>
      )}
    </div>
  )
}

export default PDFThumbnail
