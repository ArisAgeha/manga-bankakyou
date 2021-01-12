import DataStore from 'nedb';
import { AuthorDto } from '../../database/entity/author.dto';
import { BookDto } from '../../database/entity/book.dto';
import { CollectionDto } from '../../database/entity/collection.dto';
import { PvDto } from '../../database/entity/pv.dto';

export { insertDoc };

type Dto = BookDto | AuthorDto | CollectionDto | PvDto;

function insertDoc<T extends Dto | Dto[]>(
    db: DataStore<T>,
    newDoc: T
): Promise<T> {
    return new Promise((resolve, reject) => {
        db.insert(newDoc, (err: Error | null, document: T) => {
            if (err) reject(err);
            else resolve(document);
        });
    });
}
