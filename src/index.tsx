import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './App.global.css';
import { findDoc, findOneDoc } from './common/utils/dbHelper';
import { configurationDb, pvDb } from './database/nedb';
import initI18n from './languages/i18n';

bootStrap();

async function bootStrap() {
    try {
        const config =
            (await findOneDoc(configurationDb, { type: 'i18n' })) || {};

        await initI18n(config?.json?.test || 'zh-cn');

        render(<App />, document.getElementById('root'));
    } catch (err) {
        console.error(err);
    }
}
