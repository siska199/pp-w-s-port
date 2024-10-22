import ContainerModal from '@components/ui/modal/container-modal';
import React, { useState } from 'react';

interface TProps {
  content: React.ReactNode;
  label: React.ReactNode;
}

const LabelWithModal = (props: TProps) => {
  const { content, label } = props;
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="inline-block ">
      <span className="cursor-pointer text-primary" onClick={handleToggleModal}>
        {label}
      </span>
      <ContainerModal
        isShow={showModal}
        onClose={handleToggleModal}
        customeClass={{ mdContent: 'py-8' }}
      >
        {content}
      </ContainerModal>
    </div>
  );
};

export default LabelWithModal;
