import { BookDto } from './book.dto';

export interface AuthorDto {
    _id?: string;
    name?: string;
    tags?: string[];
    books?: BookDto['_id'][];
    score?: number;
    last_read_date?: number;
    read_time?: number;
    is_delete?: boolean;
    top?: BookDto[];
    sort?: number;
}
