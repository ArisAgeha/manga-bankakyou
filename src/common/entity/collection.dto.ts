import { BookDto } from './book.dto';
import { PictureDto } from './picture.dto';

export interface CollectionDto {
    _id?: string;
    name?: string;
    tags?: string[];
    books?: BookDto['_id'][];
    pictures?: PictureDto['_id'][];
    score?: number;
    last_read_date?: number;
    read_time?: number;
    is_delete?: boolean;
    top: BookDto['_id'][];
}
