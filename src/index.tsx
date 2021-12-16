import { remote } from 'electron';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './App.global.css';
import { Services } from './common/serviceCollection';
import initI18n from './languages/i18n';
import { Gesture } from './renderer/utils/gesture';
import { db } from './common/nedb';
import { ConfigurationService } from './main/services';
import { processConfig } from './common/constant/config.constant';

bootStrap();

async function bootStrap() {
    const services: Services = remote.getGlobal('services');

    const configurationService: ConfigurationService = services.configuration;
    const languageSetting: string = configurationService.getValue(
        'process',
        processConfig.LOCALE_LANGUAGE
    ) as string;
    await initI18n(languageSetting);

    // init nedb
    await db.collection?.load();
    // db.directory.ensureIndex({ fieldName: 'url', unique: true });

    try {
        const defaultLng = (await services.configuration!.getValue(
            'i18n',
            'default_lng'
        )) as string;

        await initI18n(defaultLng || 'zh-cn');

        render(<App />, document.getElementById('root'));
    } catch (err) {
        console.error(err);
    }
}
