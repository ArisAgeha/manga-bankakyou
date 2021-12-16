import {
    LogService,
    IpcService,
    FileService,
    EnvironmentService,
    ChokidarService,
    ConfigurationService,
} from '../main/services';

ChokidarService;

export type Services = {
    chokidar: ChokidarService;
    configuration: ConfigurationService;
    file: FileService;
    environment: EnvironmentService;
    log: LogService;
    ipc: IpcService;
};

export const services: Services = {
    // @ts-ignore
    chokidar: undefined,
    // @ts-ignore
    configuration: undefined,
    // @ts-ignore
    file: undefined,
    // @ts-ignore
    environment: undefined,
    // @ts-ignore
    log: undefined,
    // @ts-ignore
    ipc: undefined,
};
