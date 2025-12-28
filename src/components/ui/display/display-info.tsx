import DisplayFile from '@components/ui/display/display-file';
import DisplayInnerHMTL from '@components/ui/display/display-inner-hmtl';

import { cn } from '@lib/helper/function';
import { TFileWithPreview } from '@typescript/index-type';

export enum TTypeDispalyInformation {
    TEXT = 'TEXT',
    FILE = 'FILE',
    HTML = 'HTML',
}

type TPropsDisplayInformation = React.HTMLProps<HTMLDivElement> & {
    label?: React.ReactNode;
    layout?: 'vertical' | 'horizontal';
    customeClass?: {
        container?: string;
        containerLabel?: string;
        containerValue?: string;
    };
    withBorder?: boolean;
} & (TTextInformation | TFIleInformation);

interface TTextInformation {
    type?: Exclude<TTypeDispalyInformation, 'file'>;
    value?: string;
}

interface TFIleInformation {
    type?: Extract<TTypeDispalyInformation, 'file'>;
    value?: TFileWithPreview;
}

const DisplayInfo = (props: TPropsDisplayInformation) => {
    const { type = 'text', withBorder, label, value, customeClass, layout = 'vertical' } = props;
    return (
        <div
            className={cn({
                [`${customeClass?.container} flex flex-col `]: true,
                'flex-row': layout === 'horizontal',
                'border rounded-md p-2': withBorder,
            })}
        >
            {label && <div className={`${customeClass?.containerLabel}  font-bold`}>{label}</div>}

            {value && (
                <div className={`${customeClass?.containerValue}`}>
                    {type === TTypeDispalyInformation.TEXT && <div>{value}</div>}
                    {type === TTypeDispalyInformation.FILE && typeof value === 'object' && <DisplayFile file={value} />}
                    {type === TTypeDispalyInformation.HTML && typeof value === 'string' && <DisplayInnerHMTL html={value} />}
                </div>
            )}
        </div>
    );
};

export default DisplayInfo;
