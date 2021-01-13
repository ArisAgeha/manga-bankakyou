import { injectable } from '../../common/decorator/injectable';
import { findOneDoc } from '../../common/utils/dbHelper';
import { isUndefinedOrNull } from '../../common/utils/typesUtils';
import {
    ConfigType,
    ConfigurationDto,
} from '../../database/entity/configuration';
import { configurationDb } from '../../database/nedb';

@injectable
export class ConfigurationService {
    constructor() {}

    initial(): void {}

    async getConfigByValue<T>(type: ConfigType, field: string) {
        const target = await findOneDoc(configurationDb, { type });
        if (!target) return '';

        const targetVal = target.config && target.config[field];

        if (!isUndefinedOrNull(targetVal)) return targetVal;
        return '';
    }
}

export interface I18nConfig {
    defaultLng: string;
}
