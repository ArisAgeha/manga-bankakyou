import DataStore from 'nedb';
import { AuthorDto } from '../entity/author.dto';
import { BooksDto } from '../entity/books.dto';
import { CollectionDto } from '../entity/collection.dto';
import { PvDto } from '../entity/pv.dto';

export function insertDoc<
    T extends PvDto | CollectionDto | BooksDto | AuthorDto
>(db: DataStore<T>, newDoc: T) {
    return new Promise((resolve, reject) => {
        db.insert(newDoc, (err: Error | null, document: T) => {
            if (err) reject();
            else resolve(document);
        });
    });
}
