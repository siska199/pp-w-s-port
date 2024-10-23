import React from 'react';

interface TProps
  extends Omit<React.HTMLProps<HTMLDivElement>, 'label' | 'value'> {
  label: React.ReactNode;
  value: React.ReactNode;
  customeClass?: {
    label?: string;
    value?: string;
  };
}

const DisplayInfo = (props: TProps) => {
  const { label, value, className, customeClass } = props;
  return (
    <div className={`${className} flex flex-col gap-2`}>
      <label className={`${customeClass?.label} font-bold`}>{label}</label>
      <div className={`${customeClass?.value}`}>{value}</div>
    </div>
  );
};

export default DisplayInfo;
