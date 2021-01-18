import { remote } from 'electron';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './App.global.css';
import { Services } from './common/serviceCollection';
import initI18n from './languages/i18n';

bootStrap();

async function bootStrap() {
    const services: Services = remote.getGlobal('services');
    try {
        const defaultLng = await services.configuration!.getConfigByValue(
            'i18n',
            'default_lng'
        );

        await initI18n(defaultLng || 'zh-cn');

        render(<App />, document.getElementById('root'));
    } catch (err) {
        console.error(err);
    }
}
