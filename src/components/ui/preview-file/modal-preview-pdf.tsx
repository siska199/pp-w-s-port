import ContainerModal, { TContainerModalProps } from '@components/ui/modal/container-modal'
import PreviewPDF from '@components/ui/preview-file/preview-pdf'

interface TPropsModalPreviewPDF extends Omit<TContainerModalProps, 'children'> {
  file: File
}

const ModalPreviewPDF = (props: TPropsModalPreviewPDF) => {
  const { file, ...attrsModal } = props
  return (
    <ContainerModal
      {...attrsModal}
      title='Preview PDF'
      customeClass={{ mdBody: 'md:min-w-[50rem] px-0 border border-error' }}
    >
      <PreviewPDF file={file} customeClass={{ container: 'max-h-full h-full w-full' }} />
    </ContainerModal>
  )
}

export default ModalPreviewPDF
