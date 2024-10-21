import HeaderPage from '@components/ui/header-page';
import React from 'react';

interface TProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  title: string;
  onClickAddData?: () => void;
}

const ContainerProtectedPage = (props: TProps) => {
  const { children, title, onClickAddData, className, ...attrs } = props;
  return (
    <div
      className={`container-page gap-y-8 h-full scrollbar-hidden p-4 md:p-8 ${className}`}
      {...attrs}
    >
      <HeaderPage title={title} onClickAddData={onClickAddData} />
      {children}
    </div>
  );
};

export default ContainerProtectedPage;
