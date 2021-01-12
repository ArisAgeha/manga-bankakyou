import { injectable } from '../../common/decorator/injectable';

@injectable
export class LogService {
    constructor() {}

    log<T>(message: T): void {}

    warn<T>(message: T): void {
        console.warn(message);
    }

    error<T>(message: T): void {
        console.error(message);
    }
}
