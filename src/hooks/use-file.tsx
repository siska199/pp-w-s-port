import { TFileValue } from '@components/ui/input/input-file/input-file-v2'

import { extractExtensionFile } from '@lib/helper/function'

const useFile = () => {
  const handleGetFileFromUrl = async (params: {
    url: string
    filename: string
  }): Promise<TFileValue> => {
    let { filename } = params
    const { url } = params
    const response = await fetch(url)

    if (!response.ok) return null
    const blob = await response.blob()

    filename = `${filename}.${extractExtensionFile(blob?.type)}`
    const newFile = new File([blob], filename, { type: blob.type })
    const previewUrl = URL.createObjectURL(newFile)
    Object.assign(newFile, { preview: previewUrl })
    return newFile
  }
  return { handleGetFileFromUrl }
}

export default useFile
