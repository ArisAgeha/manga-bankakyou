import 'reflect-metadata';
import { EnvironmentService } from '../services/environment.service';
import { LogService } from '../services/log.service';
import { FileService } from '../services/file.service';
import { ConfigurationService } from '../services/configuration.service';
import { ChokidarService } from '../services/chokidar.service';
import { IpcService } from '../services/ipc.services';
import { createInstance } from '../../common/decorator/injectable';

export class Core {
    constructor() {}

    startup() {
        this.createServices();
    }

    private createServices(): void {
        const serviceCollection = new ServiceCollection();

        // create service by IOC
        const environmentService = createInstance(EnvironmentService);
        const logService = createInstance(LogService);
        const fileService = createInstance(FileService);
        const configurationService = createInstance(ConfigurationService);
        const chokidarService = createInstance(ChokidarService);
        const ipcService = createInstance(IpcService);

        // store service
        serviceCollection.set('environment', environmentService);
        serviceCollection.set('log', logService);
        serviceCollection.set('file', fileService);
        serviceCollection.set('configuration', configurationService);
        serviceCollection.set('ipc', ipcService);
        serviceCollection.set('chokidar', chokidarService);

        // auto initial service
        environmentService.initial();
        configurationService.initial();
        fileService.initial();
        ipcService.initial();

        // mount service to electron.app.remote
        global.serviceCollection = serviceCollection;
    }
}
