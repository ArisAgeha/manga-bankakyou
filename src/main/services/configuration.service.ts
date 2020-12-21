import { injectable } from '@/common/decorator/injectable';
import { FileService } from './file.service';
import { isObject, getTypeof } from '@/common/utils/types';
import { LogService } from './log.service';
import { throttle, debounce } from '@/common/decorator/decorator';

@injectable
export class ConfigurationService {
    constructor() {}

    initial(): void {}
}
