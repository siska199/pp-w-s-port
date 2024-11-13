import React, { useEffect, useRef, useState } from 'react'
import { messageError } from '@validation/constant'

import Avatar from '@components/ui/avatar'
import Button from '@components/ui/button'
import Image from '@components/ui/image'
import ContainerInput from '@components/ui/input/container-input'
import PDFThumbnail from '@components/ui/pdf-thumbnail'

import {
  convertBytesToMegabytes,
  getGeneralTypeFile,
  handleDownloadFile,
  isValidTypeFile
} from '@lib/helper/function'
import { TBasePropsInput, TCustomeEventOnChange, TTypeFile } from '@typescript/ui-types'
import { IconCamera } from '@assets/icons'

type TFileWithPreview = File & { preview?: string }
export type TFileValue = TFileWithPreview | null
export interface TPropsInputFileV1
  extends Omit<TBasePropsInput, 'variant'>,
    Omit<Partial<React.HTMLProps<HTMLInputElement>>, 'value' | 'onChange'> {
  name: string
  totalMaxSize?: number
  listAcceptedTypeFile?: TTypeFile[] | []
  onChange: (e: TCustomeEventOnChange<TFileValue>) => void
  value: TFileValue | null | undefined
  variant?: 'change-profile' | 'general'
}

const InputFileV1 = (props: TPropsInputFileV1) => {
  const {
    listAcceptedTypeFile = [TTypeFile.ALL],
    totalMaxSize = 5,
    onChange,
    name,
    variant = 'general',
    errorMessage,
    ...attrsInput
  } = props

  const inputFileRef = useRef<HTMLInputElement | null>(null)

  const [acceptedFile, setAcceptedFile] = useState('')
  const [errorMessageDynamic, setErrorMessageDynamic] = useState('')

  useEffect(() => {
    setErrorMessageDynamic(errorMessage || '')
  }, [errorMessage])

  useEffect(() => {
    setAcceptedFile(variant === 'change-profile' ? 'image/*' : listAcceptedTypeFile?.join(', '))
  }, [listAcceptedTypeFile])

  const handleOnClickInput = <T extends React.MouseEvent>(e: T) => {
    e?.preventDefault()
    inputFileRef?.current?.click()
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0] as TFileWithPreview
    const isValidFile = handleValidationInputFile(file)
    file.preview = URL.createObjectURL(file)

    onChange({
      target: {
        name,
        value: isValidFile ? file : null
      }
    })
  }

  const handleValidationInputFile = (file: File): boolean => {
    const totalSize = convertBytesToMegabytes(file.size)

    if (totalSize > totalMaxSize) {
      setErrorMessageDynamic(messageError.maxSizeFile)
      return false
    }

    if (!isValidTypeFile({ file, listAcceptedTypeFile })) {
      setErrorMessageDynamic(messageError.fileType(listAcceptedTypeFile))
      return false
    }

    setErrorMessageDynamic('')
    return true
  }

  const handleOnDownloadFile = () => {
    const file = attrsInput?.value as TFileWithPreview | undefined
    if (file?.preview && file?.name) {
      handleDownloadFile({
        url: file.preview,
        filename: file.name
      })
    }
  }

  return (
    <ContainerInput<React.HTMLProps<HTMLInputElement>>
      {...attrsInput}
      customeClass={{
        ...attrsInput.customeClass,
        ciV2: '!border-none !p-0'
      }}
      errorMessage={errorMessageDynamic}
      isClerable={false}
    >
      {variant === 'change-profile' && (
        <Avatar
          size={'large'}
          src={(attrsInput?.value as TFileWithPreview)?.preview || ''}
          customeIcon={
            <IconCamera className='icon-primary-fill' onClick={(e) => handleOnClickInput(e)} />
          }
        />
      )}

      {variant === 'general' && (
        <div className='flex gap-4 '>
          {attrsInput.value ? (
            <Thumbnail file={attrsInput.value} />
          ) : (
            <Image
              className={`self-center !h-[7rem] !w-[7rem] border ${
                errorMessageDynamic && '!border-error'
              }`}
              width={500}
              height={500}
              src={'placeholder-image.png'}
              alt='Initial Image'
            />
          )}

          <div className='space-y-3 my-auto'>
            <p className='font-italic'>
              Please upload a file (Max size: {totalMaxSize}MB, Formats:{' '}
              {listAcceptedTypeFile?.includes(TTypeFile.ALL)
                ? 'All files'
                : listAcceptedTypeFile?.join(', ')}
              )
            </p>
            <div className='flex gap-2'>
              <Button variant={'outline-primary'} onClick={handleOnClickInput}>
                Choose File
              </Button>
              <span
                className={`my-auto text-gray ${
                  attrsInput?.value && 'cursor-pointer hover:underline'
                }`}
                onClick={handleOnDownloadFile}
              >
                {attrsInput?.value?.name ?? 'No File Choosen'}
              </span>
            </div>
          </div>
        </div>
      )}

      <input
        {...attrsInput}
        ref={inputFileRef}
        className='hidden'
        type='file'
        accept={acceptedFile}
        value={''}
        multiple={false}
        onChange={(e) => handleOnChange(e)}
      />
    </ContainerInput>
  )
}

interface TPropsThumbnail {
  file: File
}

const Thumbnail = (props: TPropsThumbnail) => {
  const { file } = props
  return (
    <>
      {getGeneralTypeFile(file?.type) === 'image' && (
        <Image
          className='self-center  !h-[7rem] !w-[7rem] border '
          width={500}
          height={500}
          src={(file as TFileWithPreview)?.preview || ''}
          alt='Preview Image'
        />
      )}
      {getGeneralTypeFile(file?.type) === 'pdf' && (
        <PDFThumbnail
          customeClass={{
            container: '!h-[7rem] !w-[7rem] !max-h-[7rem] !max-w-[7rem] !min-w-[7rem]'
          }}
          file={file}
        />
      )}
    </>
  )
}

export default InputFileV1
