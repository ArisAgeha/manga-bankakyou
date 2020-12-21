import DataStore from 'nedb-promises';

export const db: {
    [key in DbName]?: DataStore;
} = {
    collection: DataStore.create({ filename: '../userdata/collection' }),
    directory: DataStore.create({ filename: '../userdata/directory' }),
    tag: DataStore.create({ filename: '../userdata/tag' }),
    author: DataStore.create({ filename: '../userdata/author' }),
};

export type DbName = 'collection' | 'directory' | 'tag' | 'author';