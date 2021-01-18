export type GestureHandler = () => void;

export interface GestureMaps {
    [key: string]: GestureHandlerItem[];
}

export type GestureHandlerItem = {
    dispatchCondition: DispatchCondition[];
    gestureHandler: GestureHandler;
};

export type KeyType = {
    mouseType: 'L' | 'R' | 'LR' | 'M';
    ctrlKey?: boolean;
    shiftKey?: boolean;
};

export type Direction = 'T' | 'TR' | 'R' | 'RB' | 'B' | 'BL' | 'L' | 'LT';

export interface DispatchCondition {
    direction: Direction;
    minDistance?: number;
    maxDistance?: number;
    maxSpendTime?: number;
}

export type MoveStep = {
    deltaX: number;
    deltaY: number;
    direction: Direction;
    spendTime: number;
};

class GestureFactory {
    private refs = new WeakMap<HTMLElement, GestureMaps>();

    private MIN_DETECT_DISTANCE = 100;

    constructor() {}

    registry(
        target: HTMLElement,
        keyType: KeyType,
        dispatchCondition: DispatchCondition[],
        gestureHandler: GestureHandler
    ) {
        if (!this.refs.get(target)) {
            this.initListener(target);
        }

        const identifier = this.getIdentifier(keyType);
        this.saveGestureHandler(
            target,
            identifier,
            dispatchCondition,
            gestureHandler
        );
    }

    private saveGestureHandler(
        target: HTMLElement,
        identifier: string,
        dispatchCondition: DispatchCondition[],
        gestureHandler: GestureHandler
    ) {
        const gestureMaps = this.refs.get(target) as GestureMaps;
        if (!Array.isArray(gestureMaps[identifier])) {
            gestureMaps[identifier] = [
                {
                    dispatchCondition,
                    gestureHandler,
                },
            ];
        } else if (
            !gestureMaps[identifier].some(
                (handlerStore) => handlerStore.gestureHandler === gestureHandler
            )
        ) {
            gestureMaps[identifier].push({
                gestureHandler,
                dispatchCondition,
            });
        }
    }

    private initListener(target: HTMLElement) {
        target.addEventListener('mousedown', (downEvent: MouseEvent) => {
            const mouseType = this.getMouseTypeFromButtons(downEvent.buttons);
            if (!mouseType) return;

            const keyType: KeyType = {
                mouseType,
                ctrlKey: downEvent.ctrlKey,
                shiftKey: downEvent.shiftKey,
            };

            const moveStep: MoveStep[] = [];
            const moveSlice = { x: 0, y: 0 };
            let timer = 0;

            const onMove = (moveEvent: MouseEvent) => {
                moveSlice.x += moveEvent.movementX;
                moveSlice.y -= moveEvent.movementY;

                if (
                    Math.abs(moveSlice.x) > this.MIN_DETECT_DISTANCE ||
                    Math.abs(moveSlice.y) > this.MIN_DETECT_DISTANCE
                ) {
                    const direction = this.getDirection(
                        moveSlice.x,
                        moveSlice.y
                    );
                    const latestMoveStep = moveStep[moveStep.length - 1];

                    if (
                        moveStep.length > 0 &&
                        latestMoveStep?.direction === direction
                    ) {
                        latestMoveStep.deltaX += moveSlice.x;
                        latestMoveStep.deltaY += moveSlice.y;
                        latestMoveStep.spendTime = Number(Date.now()) - timer;
                    } else {
                        timer = Number(Date.now());
                        moveStep.push({
                            deltaX: moveSlice.x,
                            deltaY: moveSlice.y,
                            direction,
                            spendTime: 0,
                        });
                    }
                    moveSlice.x = 0;
                    moveSlice.y = 0;
                }
            };

            window.addEventListener('mousemove', onMove);
            window.addEventListener(
                'mouseup',
                () => {
                    window.removeEventListener('mousemove', onMove);

                    this.checkHandlerList(target, moveStep, keyType);
                },
                { once: true }
            );
        });
    }

    private checkHandlerList(
        target: HTMLElement,
        moveStep: MoveStep[],
        keyType: KeyType
    ) {
        const identifier = this.getIdentifier(keyType);
        const gestureMap = this.refs.get(target) as GestureMaps;
        const handlerStore = gestureMap[identifier];
        if (!Array.isArray(handlerStore)) return;

        handlerStore.forEach((handler) => {
            this.checkShouldInvokeHandler(handler, moveStep);
        });
    }

    private checkShouldInvokeHandler(
        handler: GestureHandlerItem,
        realMoveStep: MoveStep[]
    ): void {
        const { dispatchCondition, gestureHandler } = handler;
        if (dispatchCondition.length > realMoveStep.length) return;
        for (let i = 0; i < dispatchCondition.length; i++) {
            const expectedAction = dispatchCondition[i];
            const realAction = realMoveStep[i];

            const { direction, maxDistance, maxSpendTime } = expectedAction;

            if (direction !== realAction.direction) return;
            if (maxSpendTime && maxSpendTime < realAction.spendTime) return;

            const realDistance =
                realAction.direction.length === 1
                    ? Math.max(
                          Math.abs(realAction.deltaX),
                          Math.abs(realAction.deltaY)
                      )
                    : Math.sqrt(
                          Math.abs(realAction.deltaX) ** 2 +
                              Math.abs(realAction.deltaY) ** 2
                      );

            if (maxDistance && maxDistance < realDistance) return;

            const minDistance = expectedAction.minDistance
                ? Math.max(expectedAction.minDistance, this.MIN_DETECT_DISTANCE)
                : this.MIN_DETECT_DISTANCE;
            if (minDistance > realDistance) return;

            gestureHandler();
        }
    }

    private getDirection(deltaX: number, deltaY: number): Direction {
        if (deltaX === 0) return deltaY > 0 ? 'T' : 'B';
        if (deltaY === 0) return deltaX > 0 ? 'R' : 'L';

        let direction: Direction = 'T';
        const tan225 = Math.tan((Math.PI / 180) * 22.5); // 0.41
        const tan675 = Math.tan((Math.PI / 180) * 67.5); // 2.4

        const res = deltaY / deltaX;

        if (deltaY > 0) {
            if (res > 0 && res < tan225) direction = 'R';
            else if (res > tan225 && res < tan675) direction = 'TR';
            else if (res > tan675 || res < -tan675) direction = 'T';
            else if (res > -tan675 && res < -tan225) direction = 'LT';
            else direction = 'L';
        } else if (res > 0 && res < tan225) direction = 'L';
        else if (res > tan225 && res < tan675) direction = 'BL';
        else if (res > tan675 || res < -tan675) direction = 'B';
        else if (res > -tan675 && res < -tan225) direction = 'RB';
        else direction = 'R';

        return direction;
    }

    private getMouseTypeFromButtons(buttons: number) {
        if (buttons === 1) return 'L';
        if (buttons === 2) return 'R';
        if (buttons === 3) return 'LR';
        if (buttons === 4) return 'M';
        return null;
    }

    private getIdentifier(keyType: KeyType) {
        const { mouseType, ctrlKey, shiftKey } = keyType;
        return `${ctrlKey ? 'c' : ''}${shiftKey ? 's' : ''}${mouseType}`;
    }
}

export const Gesture = new GestureFactory();
