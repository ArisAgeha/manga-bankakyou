import { ChokidarService } from '@/main/services/chokidar.service';
import { ConfigurationService } from '@/main/services/configuration.service';
import { EnvironmentService } from '@/main/services/environment.service';
import { FileService } from '@/main/services/file.service';
import { IpcService } from '@/main/services/ipc.services';
import { LogService } from '@/main/services/log.service';

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
