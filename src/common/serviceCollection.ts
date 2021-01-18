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
    chokidar: ChokidarService | null;
    configuration: ConfigurationService | null;
    file: FileService | null;
    environment: EnvironmentService | null;
    log: LogService | null;
    ipc: IpcService | null;
};

export const services: Services = {
    chokidar: null,
    configuration: null,
    file: null,
    environment: null,
    log: null,
    ipc: null,
};
