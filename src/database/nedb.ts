import DataStore from 'nedb';
import { PvDto } from './entity/pv.dto';
import { CollectionDto } from './entity/collection.dto';
import { BookDto } from './entity/book.dto';
import { AuthorDto } from './entity/author.dto';
import { Configs, ConfigurationDto } from './entity/configuration.dto';
import { findOneDoc } from '../common/utils/dbHelper';

export const pvDb = new DataStore<PvDto>({
    filename: './userdata/pv',
    autoload: true,
});

export const collectionDb = new DataStore<CollectionDto>({
    filename: './userdata/collection',
    autoload: true,
});

export const booksDb = new DataStore<BookDto>({
    filename: './userdata/books',
    autoload: true,
});

export const authorDb = new DataStore<AuthorDto>({
    filename: './userdata/author',
    autoload: true,
});

export const configurationDb = new DataStore<ConfigurationDto<keyof Configs>>({
    filename: './userdata/configuration',
    autoload: true,
});
