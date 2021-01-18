export interface EnvConfig {
    is_inited: boolean;
}
export interface I18nConfig {
    default_lng: string;
}

export interface WindowsConfig {
    width: number;
    height: number;
}

export interface WorkbenchConfig {
    sidebar_width: number;
    show_sidebar: boolean;
}

export interface GalleryConfig {
    default_view_mode: 'double';
    default_pics_per_line: number;
    double_direction: 'LR' | 'RL';
    scroll_direction: 'TB' | 'BT' | 'LR' | 'RL';
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
