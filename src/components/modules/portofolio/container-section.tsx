import Container, { TPropsContainer } from '@components/ui/container';

interface TProps extends TPropsContainer {
  children: React.ReactNode;
  title?: string;
}

const ContainerSection = (props: TProps) => {
  const { children, className, title, ...attrs } = props;
  return (
    <Container
      gap="base"
      variant={title ? 'vcc' : 'hcc'}
      className={`min-h-[calc(100vh)] p-8  ${className} `}
      {...attrs}
    >
      {title && (
        <h3 className=" text-heading-05 md:text-heading-03 text-center font-bubblegum-sans">
          {title}
        </h3>
      )}
      {children}
    </Container>
  );
};

export default ContainerSection;
