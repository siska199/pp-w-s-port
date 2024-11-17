import React, { useCallback, useRef, useState } from 'react'
import { Document, DocumentProps, Page } from 'react-pdf'
import type { PDFDocumentProxy } from 'pdfjs-dist'

import Button from '@components/ui/button'
import { TFileValue } from '@components/ui/input/input-file/input-file-v1'

import useResizeObserver from '@hooks/use-resize-observer'
import { handleDownloadFile } from '@lib/helper/function'
import { IconZoomIn, IconZoomOut } from '@assets/icons'

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
  const [scale, setScale] = useState(1.0)

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

  const handleScale = (
    e: React.MouseEvent<HTMLButtonElement | HTMLLinkElement, MouseEvent>,
    type: 'zoom-in' | 'zoom-out'
  ) => {
    e.preventDefault()
    e?.stopPropagation()
    let updatedScale = scale
    if (type === 'zoom-in') {
      updatedScale += 0.1
    } else {
      updatedScale -= 0.1
    }
    setScale(updatedScale)
  }

  const handleOnDownloadFile = (
    e: React.MouseEvent<HTMLButtonElement | HTMLLinkElement, MouseEvent>
  ) => {
    e?.preventDefault()
    e?.stopPropagation()
    const file = attrsDocument.file as TFileValue
    if (file?.preview && file?.name) {
      handleDownloadFile({
        url: file.preview,
        filename: file.name
      })
    }
  }
  return (
    <>
      <div
        className={`overflow-auto w-full flex h-full   ${customeClass?.container}`}
        ref={containerRef}
      >
        <Document
          className={'mx-auto max-w-full'}
          onLoadSuccess={handleOnLoadSuccess}
          {...attrsDocument}
        >
          {[...new Array(pages)]?.map((_, index) => (
            <Page
              key={`page_${index}`}
              pageNumber={index + 1}
              className={`${customeClass?.page}`}
              width={containerSize.width}
              height={containerSize.height}
              scale={scale}
            />
          ))}
        </Document>
      </div>
      <div className='sticky bottom-0 bg-white flex justify-between gap-2'>
        <div className='flex gap-2'>
          <Button onClick={(e) => handleScale(e, 'zoom-in')} variant={'no-style'}>
            <IconZoomIn className='icon-primary icon-primary-fill' />
          </Button>
          <Button onClick={(e) => handleScale(e, 'zoom-out')} variant={'no-style'}>
            <IconZoomOut className='icon-primary icon-primary-fill' />
          </Button>
        </div>

        <Button onClick={handleOnDownloadFile} variant={'outline-primary'} shape={'circle'}>
          Download
        </Button>
      </div>
    </>
  )
}

export default React.memo(PreviewPDF)