import DataStore from 'nedb';

export const dbs = {
    collection: new DataStore({
        filename: '../userdata/collection',
        autoload: true,
    }),
    directory: new DataStore({
        filename: '../userdata/directory',
        autoload: true,
    }),
    author: new DataStore({ filename: '../userdata/author', autoload: true }),
};
