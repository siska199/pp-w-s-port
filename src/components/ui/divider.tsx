import { cn } from '@lib/helper';

interface TProps {
  variant?: 'left-aligned' | 'center-aligned' | 'right-aligned';
  text?: string;
  width?: string;
  height?: string;
  customeClass?: {
    text?: string;
  };
}

const Divider = (props: TProps) => {
  const {
    variant = 'center-aligned',
    text,
    width = '100%',
    height = '1px',
    customeClass,
  } = props;
  return (
    <div className="relative flex  items-center w-full">
      {['right-aligned', 'center-aligned']?.includes(variant) && (
        <div style={{ width, height }} className="flex-grow border-t "></div>
      )}
      <span
        className={cn({
          'flex-shrink mx-4 text-gray': true,
          [customeClass?.text || '']: customeClass?.text,
          hidden: !text,
        })}
      >
        {text}
      </span>
      {['left-aligned', 'center-aligned']?.includes(variant) && (
        <div style={{ width, height }} className="flex-grow border-t "></div>
      )}
    </div>
  );
};

export default Divider;
