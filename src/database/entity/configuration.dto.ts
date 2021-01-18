export interface I18nConfig {
    defaultLng: string;
}

export interface WindowsConfig {
    width: number;
    height: number;
}

export interface WorkbenchConfig {
    sidebarWidth: number;
    showSidebar: boolean;
}

export interface GalleryConfig {
    defaultViewMode: 'double';
    defaultPicsPerLine: number;
    doubleDirection: 'LR' | 'RL';
    scrollDirection: 'TB' | 'BT' | 'LR' | 'RL';
}

export type Configs = {
    i18n: I18nConfig;
    windows: WindowsConfig;
    workbench: WorkbenchConfig;
};

export interface ConfigurationDto<T extends keyof Configs> {
    _id?: string;
    type?: T;
    config?: Configs[T];
}
