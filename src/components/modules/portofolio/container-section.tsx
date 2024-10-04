import Container, { TPropsContainer } from '@components/ui/container';

interface TProps extends TPropsContainer {
  children: React.ReactNode;
}

const ContainerSection = (props: TProps) => {
  const { children, className, ...attrs } = props;
  return (
    <Container
      gap="base"
      variant={'hcc'}
      className={`${className} min-h-[calc(100%)] p-8`}
      {...attrs}
    >
      {children}
    </Container>
  );
};

export default ContainerSection;
