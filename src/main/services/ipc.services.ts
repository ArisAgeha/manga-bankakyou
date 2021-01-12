import { BrowserWindow, app } from 'electron';
import { injectable } from '../../common/decorator/injectable';
import { FileService } from './file.service';
import { ConfigurationService } from './configuration.service';
import { isBoolean } from '../../common/utils/typesUtils';

@injectable
export class IpcService {
    constructor(
        private readonly fileService: FileService,
        private readonly configurationService: ConfigurationService
    ) {}

    initial(): void {}

    toggleFullscreen = (event: any, setToFullscreen?: boolean) => {
        const window = BrowserWindow.getAllWindows()[0];
        const setVal = isBoolean(setToFullscreen)
            ? setToFullscreen
            : !window.isFullScreen();
        window.setFullScreen(setVal);
    };
}
