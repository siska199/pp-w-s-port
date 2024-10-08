import React, { HTMLProps } from 'react';

interface TPropsContainerLandingPage extends HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

const ContainerLandingPage = (props: TPropsContainerLandingPage) => {
  const { children, ...attrs } = props;
  return (
    <div
      {...attrs}
      className={`h-full overflow-y-auto space-y-16 text-white ${attrs.className}`}
    >
      {children}
    </div>
  );
};

export default ContainerLandingPage;
