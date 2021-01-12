import DataStore from 'nedb';
import { AuthorDto } from './entity/author.dto';
import { BooksDto } from './entity/books.dto';
import { CollectionDto } from './entity/collection.dto';
import { PvDto } from './entity/pv.dto';

export const pvDb = new DataStore<PvDto>({
    filename: '../userdata/pv',
    autoload: true,
});

export const collectionDb = new DataStore<CollectionDto>({
    filename: '../userdata/collection',
    autoload: true,
});

export const booksDb = new DataStore<BooksDto>({
    filename: '../userdata/books',
    autoload: true,
});

export const authorDb = new DataStore<AuthorDto>({
    filename: '../userdata/author',
    autoload: true,
});
