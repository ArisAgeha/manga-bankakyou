import { ServiceCollection } from '@/common/serviceCollection';

declare global {
    namespace NodeJS {
        interface Global {
            serviceCollection: ServiceCollection;
        }
    }
}
