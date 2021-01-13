export type ConfigType = 'i18n' | 'windows' | 'workbench';

export interface ConfigurationDto {
    _id?: string;
    type?: ConfigType;
    config?: { [key: string]: any };
}
