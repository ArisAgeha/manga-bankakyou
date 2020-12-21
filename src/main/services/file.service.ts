import fs from 'fs';
import path from 'path';
import { injectable } from '@/common/decorator/injectable';
import { LogService } from './log.service';

@injectable
export class FileService {
    constructor(private readonly logService: LogService) {}

    MAX_RECURSIVE_DEPTH = 999;

    initial() {}

    private pr(...args: string[]): string {
        return path.resolve(...args);
    }
}
