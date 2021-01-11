import fs from 'fs';
import path from 'path';
import { injectable } from '@/common/decorator/injectable';
import chokidar from 'chokidar';
import { LogService } from './log.service';

@injectable
export class ChokidarService {
    constructor(private readonly logService: LogService) {}

    private readonly watch: {
        [key: string]: chokidar.FSWatcher;
    } = {};

    watchDir(dir: string) {
        const watcher = chokidar.watch(dir, { depth: 2 });
        watcher
            .on('add', (p) => console.log(`File ${p} has been added`))
            .on('change', (p) => console.log(`File ${p} has been changed`))
            .on('unlink', (p) => console.log(`File ${p} has been removed`))
            .on('addDir', (p) => console.log(`Directory ${p} has been added`))
            .on('unlinkDir', (p) =>
                console.log(`Directory ${p} has been removed`)
            )
            .on('error', (error) =>
                console.log(`Watcher error: ${String(error)}`)
            )
            .on('ready', () =>
                console.log('Initial scan complete. Ready for changes')
            )
            .on('raw', (event, p, details) => {
                // internal
                console.log('Raw event info:', event, p, details);
            });

        this.watch[dir] = watcher;
    }

    unwatchDir(dir: string) {
        this.watch[dir]?.unwatch('*');
        delete this.watch[dir];
    }

    private pr(...args: string[]): string {
        return path.resolve(...args);
    }
}
