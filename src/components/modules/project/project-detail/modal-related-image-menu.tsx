import { useState } from 'react'

import ContainerModal from '@components/ui/modal/container-modal'
import SliderBase from '@components/ui/slider/slider-base'

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
      <SliderBase images={listImage} />
    </ContainerModal>
  )
}

export default ModalPropjectDetail
