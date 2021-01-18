import fs from 'fs';
import path from 'path';
import { injectable } from '../../common/decorator/injectable';

@injectable
export class EnvironmentService {
    constructor() {}

    initial(): void {
        this.initCfg();
    }

    initCfg() {}
}
