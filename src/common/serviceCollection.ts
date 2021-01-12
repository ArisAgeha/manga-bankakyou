import {
    LogService,
    IpcService,
    FileService,
    EnvironmentService,
    ChokidarService,
    ConfigurationService,
} from '../main/services';

ChokidarService;

export type Entries = {
    chokidar: ChokidarService | null;
    configuration: ConfigurationService | null;
    file: FileService | null;
    environment: EnvironmentService | null;
    log: LogService | null;
    ipc: IpcService | null;
};

export class ServiceCollection {
    private readonly entries: Entries = {
        chokidar: null,
        configuration: null,
        file: null,
        environment: null,
        log: null,
        ipc: null,
    };

    constructor() {}

    set<T extends keyof Entries>(id: T, instance: Entries[T]): void {
        this.entries[id] = instance;
    }

    get<T extends keyof Entries>(id: T): Entries[T] {
        return this.entries[id];
    }
}
