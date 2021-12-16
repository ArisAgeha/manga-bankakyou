import DataStore from 'nedb-promises';

export const db: {
    [key in DbName]?: DataStore;
} = {
    collection: DataStore.create({ filename: '../userdata/collection' }),
};

export type DbName = 'collection';
