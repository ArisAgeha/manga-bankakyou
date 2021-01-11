import { dbs } from '../nedb';

export async function upsertMany(querysObject: any[], updateObjs: any) {
    const exsistsObject: any[] = await db.directory
        .find({ $or: querysObject })
        .exec();
    const ninObject = querysObject.filter(
        (obj) =>
            !exsistsObject.some((eObj) =>
                Object.keys(obj).every((key) => eObj[key] === obj[key])
            )
    );
    await dbs.directory.insert(ninObject);
    await dbs.directory.update(
        { $or: querysObject },
        { $set: updateObjs },
        { multi: true }
    );
}

export function insert<T extends keyof typeof dbs, G>(target: T, newDoc: G) {
    return new Promise((resolve, reject) => {});
}
