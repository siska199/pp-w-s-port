export interface TObject {
    [key: string]: any;
}

export interface TPaginationQueryParams {
    page_no: number;
    items_perpage: number;
    total_items?: number;
    sort_by?: string;
    sort_dir?: string;
}

export enum TTypeActionModalForm {
    EDIT = 'EDIT',
    ADD = 'ADD',
}

export enum TTypeActionData {
    EDIT = 'EDIT',
    ADD = 'ADD',
    DELETE = 'DELETE',
}

export type TResponseAPI<TData extends object> = {
    status: boolean;
    data: TData;
    message: string;
};

export interface TResponseDataPaginationAPI<TData extends object> {
    items: TData[];
    current_page: number;
    total_items: number;
    total_pages: number;
}

export type TFileWithPreview = File & { preview?: string };

export type TDate = Date | string | null | undefined;
