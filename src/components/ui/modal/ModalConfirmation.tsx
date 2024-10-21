import Button from '@components/ui/Button';
import ContainerModal from '@components/ui/modal/ContainerModal';
import { TBaseModal } from '@types';

interface TProps extends TBaseModal {
    title?: string;
    button?: {
        cancel: {
            name?: string;
            onClick: () => void;
        },
        confirm: {
            name?: string;
            onClick: () => void;
        }
    }
    customeClass?: {
        header?: string;
        body?: string;
        footer?: string;
    }
}

const ModalConfirmation = (props: TProps) => {
    const { title, isShow, children, onClose: handleOnClose, button, customeClass } = props;

    const handleConfirmationBtn = () => {
        button?.confirm.onClick && button?.confirm?.onClick()
    }
    return (
        <ContainerModal isShow={isShow} onClose={handleOnClose}>

            {
                title && <div className={`md-header ${customeClass?.header}`}>
                    <p className="md-title font-bold text-gray-900 text-body-large">{title}</p>
                </div>
            }

            <div className={`md-body w-[25.6rem] text-gray ${customeClass?.body}`}>{children}</div>
            <div className={`md-footer mb-auto justify-end flex gap-2 ${customeClass?.footer}`}>
                <Button className='min-w-[5rem]' variant={"solid-white"} onClick={handleOnClose} label={button?.cancel?.name || "Cancel"} />
                <Button className='min-w-[5rem]' onClick={handleConfirmationBtn} label={button?.confirm?.name || "Confirm"} />
            </div>
        </ContainerModal>
    )
}

export default ModalConfirmation