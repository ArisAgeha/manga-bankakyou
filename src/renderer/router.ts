import loadable from '@loadable/component';

export const routerList = [
    {
        name: 'homePage',
        path: '/',
        component: loadable(() => import('./pages/home/index')),
    },
    {
        name: 'YapiTools',
        path: '/yapi',
        component: loadable(() => import('./pages/yapiTools/index')),
    },
];
