export interface Directory {
    _id: string;
    name: string;
    path: string;
    tags: string[];
    score: number;
    last_check_date: number;
    last_read_date: number;
}
