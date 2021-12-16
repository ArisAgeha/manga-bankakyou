import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './App.global.css';
import { db } from './common/nedb';

bootStrap();

async function bootStrap() {
    try {
        // init nedb
        await db.collection?.load();
        // db.directory.ensureIndex({ fieldName: 'url', unique: true });

        render(<App />, document.getElementById('root'));
    } catch (err) {
        console.error(err);
    }
}
