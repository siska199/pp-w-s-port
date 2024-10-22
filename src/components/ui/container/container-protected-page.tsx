import React from 'react';

interface TProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

const ContainerProtectedPage = (props: TProps) => {
  const { children, className, ...attrs } = props;
  return (
    <div
      className={`container-page gap-y-8 h-full scrollbar-hidden p-4 md:p-8 ${className}`}
      {...attrs}
    >
      {children}
    </div>
  );
};

export default ContainerProtectedPage;
