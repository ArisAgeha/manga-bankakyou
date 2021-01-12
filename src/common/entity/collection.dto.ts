import { BooksDto } from './books.dto';

export interface CollectionDto {
    _id: string;
    name: string;
    tags: string[];
    directorys: BooksDto['_id'][];
    score: number;
    last_read_date: number;
    read_time: number;
    is_delete: boolean;
}
