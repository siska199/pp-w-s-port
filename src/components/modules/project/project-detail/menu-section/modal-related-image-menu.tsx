import { useState } from 'react'

import ContainerModal from '@components/ui/modal/container-modal'
import SliderImageBase from '@components/ui/slider/slider-image-base'

const ModalPropjectDetail = () => {
  const [showModal, setShowModal] = useState(false)

  const listImage = [
    'dummy-images/project-goa/1.png',
    'dummy-images/project-goa/2.png',
    'dummy-images/project-goa/3.png',
    'dummy-images/project-goa/4.png',
    'dummy-images/project-goa/1.png',
    'dummy-images/project-goa/2.png'
  ]
  return (
    <ContainerModal isShow={showModal} onClose={() => setShowModal(false)}>
      <SliderImageBase images={listImage} />
    </ContainerModal>
  )
}

export default ModalPropjectDetail
