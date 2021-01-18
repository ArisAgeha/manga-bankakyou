import { injectable } from '../../common/decorator/injectable';
import { findOneDoc } from '../../common/utils/dbHelper';
import { isUndefinedOrNull } from '../../common/utils/typesUtils';
import {
    Configs,
    ConfigurationDto,
} from '../../database/entity/configuration.dto';
import { configurationDb } from '../../database/nedb';

@injectable
export class ConfigurationService {
    constructor() {}

    initial(): void {}

    async getConfigByValue<T extends keyof Configs>(
        type: T,
        field: keyof Configs[T]
    ) {
        const target = await findOneDoc<ConfigurationDto<T>>(configurationDb, {
            type,
        });
        if (!target) return '';

        const targetVal = target.config && target.config[field];

        if (!isUndefinedOrNull(targetVal)) return targetVal;
        return '';
    }
}
