interface TProps {
    loading?: React.ReactElement | string;
    children: React.ReactNode;
    isLoading: boolean;
    customeClass?: string;
}
const ContainerLoading = (props: TProps) => {
    const { children, isLoading, customeClass, loading } = props;
    return <>{isLoading ? <div className={`${customeClass} `}>{loading}</div> : children}</>;
};

export default ContainerLoading;
