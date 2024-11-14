import { useCallback, useRef, useState } from 'react'
import { Document, DocumentProps, Page } from 'react-pdf'
import type { PDFDocumentProxy } from 'pdfjs-dist'

import Button from '@components/ui/button'

import useResizeObserver from '@hooks/use-resize-observer'

type TPropsPreviewPDF = DocumentProps & {
  customeClass?: {
    container?: string
    page?: string
  }
}

const PreviewPDF = (props: TPropsPreviewPDF) => {
  const { customeClass, ...attrsDocument } = props
  const [pages, setPages] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  const handleOnResize = useCallback<ResizeObserverCallback>(
    (entries) => {
      const [entry] = entries

      if (entry) {
        const newWidth = entry.contentRect.width
        const newHeight = entry.contentRect.height

        if (newWidth !== containerSize.width || newHeight !== containerSize.height) {
          setContainerSize({ width: newWidth, height: newHeight })
        }
      }
    },
    [containerSize]
  )

  useResizeObserver({
    containerRef,
    resizeOptions: {},
    onResize: handleOnResize
  })

  const handleOnLoadSuccess = (params: PDFDocumentProxy) => {
    const { numPages } = params
    setPages(numPages)
  }

  return (
    <>
      <div className={`overflow-y-auto h-full  border ${customeClass?.container}`} ref={containerRef}>
        <Document onLoadSuccess={handleOnLoadSuccess} {...attrsDocument}>
          {[...new Array(pages)]?.map((_, index) => (
            <Page
              key={`page_${index}`}
              pageNumber={index + 1}
              className={`${customeClass?.page}`}
              width={containerSize.width}
              height={containerSize.height}
            />
          ))}
        </Document>
      </div>
      <div className='sticky bottom-0 bg-white flex justify-end'>
        <Button>Download</Button>
      </div>
    </>
  )
}

export default PreviewPDF
