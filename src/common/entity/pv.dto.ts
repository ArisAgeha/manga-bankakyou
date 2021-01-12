import { AuthorDto } from './author.dto';
import { BooksDto } from './books.dto';
import { CollectionDto } from './collection.dto';

export interface PvDto {
    _id: string;
    type: 'directory' | 'author' | 'collection';
    target_id: CollectionDto['_id'] | AuthorDto['_id'] | BooksDto['_id'];
    count: number;
}
