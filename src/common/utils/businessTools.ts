import { isArray, isString } from './types';

export function isPicture(fileOrDirUrl: string): boolean {
    return [
        'bmp',
        'jpg',
        'png',
        'jpeg',
        'exif',
        'webp',
        'tif',
        'tiff',
        'gif',
    ].some((suffix) => fileOrDirUrl.toLowerCase().endsWith(suffix));
}

export function isVideo(fileOrDirUrl: string): boolean {
    return ['webm', '.mp4'].some((suffix) =>
        fileOrDirUrl.toLowerCase().endsWith(suffix)
    );
}

export function isPictureOrVideo(fileOrDirUrl: string): boolean {
    return isVideo(fileOrDirUrl) || isPicture(fileOrDirUrl);
}

export function encodeChar(url: string): string {
    if (url.indexOf('|') !== -1)
        console.warn(
            "warning: given props is not format likes `url` but `key`, please check your code's logic"
        );
    return url.replace(/#/g, encodeURIComponent('#'));
}

export function extractVersionFromString(str: string) {
    const matchData = str.match(/\d+\.\d+\.\d+/);
    if (isArray(matchData) && isString(matchData[0])) return matchData[0];
    return '';
}
