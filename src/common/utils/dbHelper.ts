import DataStore from 'nedb';
import { AuthorDto } from '../../database/entity/author.dto';
import { BookDto } from '../../database/entity/book.dto';
import { CollectionDto } from '../../database/entity/collection.dto';
import { PvDto } from '../../database/entity/pv.dto';
import { db } from '../nedb';

type Dto = BookDto | AuthorDto | CollectionDto | PvDto;

export function insertDoc<T extends Dto | Dto[]>(
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

export function findDoc<T extends Dto>(
    db: DataStore<T>,
    query: any,
    projection: any = {}
): Promise<T[]> {
    return new Promise((resolve, reject) => {
        db.find(query, projection, (err, documents) => {
            if (err) reject(err);
            else resolve(documents);
        });
    });
}

export function findOneDoc<T extends Dto>(
    db: DataStore<T>,
    query: any,
    projection: any = {}
): Promise<T> {
    return new Promise((resolve, reject) => {
        db.findOne(query, projection, (err, documents) => {
            if (err) reject(err);
            else resolve(documents);
        });
    });
}

export async function upsertMany<T extends Dto>(
    db: DataStore<T>,
    querysObject: any[],
    updateObjs: any
) {
    const exsistsObject: any[] = await db
        .find({ $or: querysObject })
        .exec((err) => {
            console.error(err);
        });
    const ninObject = querysObject.filter(
        (obj) =>
            !exsistsObject.some((eObj) =>
                Object.keys(obj).every((key) => eObj[key] === obj[key])
            )
    );
    console.log(ninObject);
    await db.insert(ninObject);
    await db.update(
        { $or: querysObject },
        { $set: updateObjs },
        { multi: true }
    );
}
