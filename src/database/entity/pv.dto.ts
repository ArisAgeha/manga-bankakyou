import { AuthorDto } from './author.dto';
import { BookDto } from './book.dto';
import { CollectionDto } from './collection.dto';

export interface PvDto {
    _id?: string;
    type?: 'directory' | 'author' | 'collection';
    target_id?: CollectionDto['_id'] | AuthorDto['_id'] | BookDto['_id'];
    count?: number;
}
