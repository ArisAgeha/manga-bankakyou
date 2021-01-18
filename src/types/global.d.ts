import { Services } from '../common/serviceCollection';

declare global {
    namespace NodeJS {
        interface Global {
            services: Services;
        }
    }
}
