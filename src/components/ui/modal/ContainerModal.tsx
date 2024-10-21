import { IconEyeClose } from '@assets/icons';
import '@assets/styles/ui/modal.css';
import { TBaseModal } from 'types/ui-types';
import Button from '@components/ui/button';
import { cn } from '@lib/helper';
import { VariantProps, cva } from 'class-variance-authority';
import clsx from 'clsx';

export interface TModalProps
  extends TBaseModal,
    VariantProps<typeof modalVariants> {
  customeClass?: {
    mdContent?: string;
  };
  className?: string;
}

const ContainerModal = (props: TModalProps) => {
  const {
    isShow,
    customeClass,
    className,
    onClose: handleOnClose,
    children,
    variant = 'fadein-scaleup',
  } = props;

  const handleStopPropagation = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        className={cn(
          modalVariants({
            variant,
            className: clsx({
              'md-modal ': true,
              'md-show flex ': isShow,
              [className || '']: className,
            }),
          })
        )}
      >
        <div
          className={cn({
            'md-content bottom-0 relative  flex flex-col gap-2  w-full ': true,
            [customeClass?.mdContent || '']: customeClass?.mdContent,
          })}
          onClick={handleStopPropagation}
        >
          <Button
            className="absolute top-2 right-2 rounded-full w-[2rem] h-[2rem] "
            variant={'plain'}
            onClick={handleOnClose}
          >
            <IconEyeClose />
          </Button>
          <div className="max-h-[90vh] flex overflow-y-auto p-2">
            {children}
          </div>
        </div>
      </div>

      <div
        className={`${
          isShow ? 'md-show' : ''
        } md-overlay h-screen max-h-screeen`}
      ></div>
    </>
  );
};

const modalVariants = cva(' min-w-full p-4 md:min-w-[20rem] max-w-[90%] ', {
  variants: {
    variant: {
      'fadein-scaleup': 'md-fadein-scaleup min-h-[10rem]', // Fade in and scale up
      'slide-from-right': 'md-slide-from-right min-h-[10rem]', // Slide from the right
      drawer: 'md-drawer p-0 w-full', // Drawer
    },
  },
});

export default ContainerModal;
