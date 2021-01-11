import { injectable } from '@/common/decorator/injectable';
import { isObject, getTypeof } from '@/common/utils/typesUtils';
import { throttle, debounce } from '@/common/decorator/decorator';
import { FileService } from './file.service';
import { LogService } from './log.service';

@injectable
export class ConfigurationService {
    constructor() {}

    initial(): void {}
}
