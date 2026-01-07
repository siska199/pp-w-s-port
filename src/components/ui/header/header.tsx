import { useNavigate } from 'react-router-dom';

import Button from '@components/ui/button';

import { IconArrowUp } from '@assets/icons';

export interface THeaderProps {
    title: string;
    onClickAddData?: () => void;
    isNested?: boolean;
    subHeader?: React.ReactNode;
}

const Header = (props: THeaderProps) => {
    const { title, isNested, onClickAddData, subHeader } = props;
    const navigate = useNavigate();

    const handleBackBtn = () => {
        navigate(-1);
    };

    return (
        <>
            <div className="border-b flex gap-4 items-center pb-8 ">
                <div className="flex items-center gap-2">
                    {isNested && <IconArrowUp onClick={handleBackBtn} className="-rotate-90 cursor-pointer" style={{ width: '2rem', height: '2rem' }} />}
                    <div className="flex flex-col gap-2">
                        <h2 className="font-bold text-heading-04">{title}</h2>
                        {subHeader}
                    </div>
                </div>
                {onClickAddData && (
                    <Button variant={'soft-primary'} onClick={onClickAddData} className="!p-2 mt-1 !min-w-8 h-8">
                        <span className="text-body-large font-medium -mt-1">+</span>
                    </Button>
                )}
            </div>
        </>
    );
};

export default Header;
