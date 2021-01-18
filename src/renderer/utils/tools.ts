import { notification, message } from 'antd';
import { isString } from '../../common/utils/typesUtils';

type NotificationOptions = {
    msg: string;
    desc?: string | React.ReactNode;
    closeOtherNotification?: boolean;
    duration?: number;
    btn?: React.ReactNode;
    type?: 'success' | 'info' | 'warning' | 'error' | '';
};

export const notify = (options: NotificationOptions) => {
    const {
        msg,
        desc = '',
        closeOtherNotification = true,
        duration = 1.2,
        btn = null,
        type = '',
    } = options;

    if (closeOtherNotification) notification.destroy();

    const notifyParams = {
        duration,
        message: msg,
        description: desc,
        btn,
    };
    if (type) {
        notification[type](notifyParams);
    } else {
        notification.open(notifyParams);
    }
};

type MsgType = 'success' | 'info' | 'warning' | 'error';

export const msg = (msg: string, type: MsgType = 'info') => {
    if (isString(msg)) message[type](msg);

    try {
        if (isString(msg)) console.log(msg);
        else console.log(JSON.parse(JSON.stringify(msg)));
    } catch (err) {
        console.log(msg);
    }
};
