import fs from 'fs';
import path from 'path';
import { LogService } from './log.service';
import { isUndefinedOrNull } from '../../common/utils/types';
import { injectable } from '../../common/decorator/injectable';
import { readdirWithFileTypes } from '../../common/utils/fsHelper';
import { naturalCompare } from '../../common/utils/functionTools';

export interface ITreeDataNode {
    key: string;
    title: string;
    parent?: ITreeDataNode | null;
    children?: ITreeDataNode[];
}

@injectable
export class FileService {
    constructor(private readonly logService: LogService) {}

    MAX_RECURSIVE_DEPTH = 999;

    initial() {}

    /** directory tree methods */

    // invoke in import
    async loadDir(
        dir: string,
        options: {
            level: number;
            time?: number;
            keySuffix?: string;
            maxDepth?: number;
        } = {
            level: 0,
            time: 0,
            maxDepth: this.MAX_RECURSIVE_DEPTH, // max recursive depth, no limit if maxDepth === -1;
        }
    ): Promise<ITreeDataNode | null> {
        if (!options.time) options.time = 0;
        if (!fs.existsSync(dir)) return null;
        const dirInfo = await readdirWithFileTypes(dir);

        const dirTitle = (dir.match(/[^\\/]+$/) || []).pop();
        const suffix = options.keySuffix || `|${dirTitle}`;
        const tree: ITreeDataNode = {
            title: dirTitle as string,
            key: `${dir}${suffix}`,
        };

        const { level } = options;
        const maxDepth = options.maxDepth || 2;
        if (maxDepth === -1 || level < maxDepth) {
            const childrenDir: (ITreeDataNode | null)[] = (
                await Promise.all(
                    dirInfo
                        .filter((dirent) => dirent.isDirectory())
                        .map(async (dirent, index) =>
                            this.loadDir(this.pr(dir, dirent.name), {
                                level: options.level + 1,
                                time: index++,
                                keySuffix: suffix,
                                maxDepth,
                            })
                        )
                )
            )
                .filter((node) => !isUndefinedOrNull(node))
                .sort((a, b) => naturalCompare(a!.title, b!.title));

            if (childrenDir.length > 0) tree.children = childrenDir;
        }

        return tree;
    }

    /** configuration methods */
    getDirInfoSync(url: string): string[] | null {
        if (fs.existsSync(this.pr(url))) return fs.readdirSync(this.pr(url));
        return null;
    }

    loadJsonSync(...url: string[]): any {
        const absUrl: string = path.resolve(...url);
        try {
            const buffer = fs.readFileSync(absUrl) as unknown;
            return JSON.parse(buffer as string);
        } catch (err) {
            this.logService.error(err);
            throw err;
        }
    }

    writeJson(url: string, id: string, content: any) {
        const absUrl: string = (path.resolve(url, id) as string) + '.json';
        const writeString: string =
            typeof content === 'string'
                ? content
                : JSON.stringify(content, null, 4);
        fs.writeFile(absUrl, writeString, () => {
            this.logService.log('update successfully');
        });
    }

    private pr(...args: string[]): string {
        return path.resolve(...args);
    }
}
