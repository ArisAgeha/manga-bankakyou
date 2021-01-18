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

export type PreviewMode = 'waterfall' | 'default';
export type ReadMode = 'single' | 'double' | 'scroll';

export interface GalleryConfig {
    default_preview_mode: PreviewMode;
    default_read_mode: ReadMode;

    /** waterfall */
    waterfall_pics_per_line: number;

    /** single */
    single_direction: 'LR' | 'RL';

    /** double */
    double_direction: 'LR' | 'RL';

    /** scroll */
    scroll_direction: 'TB' | 'BT' | 'LR' | 'RL';
    scroll_picture_per_page: number;
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
