import { notification } from 'antd';
import { emptyCall } from '../../common/utils/functionTools';

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

    closeOtherNotification ? notification.destroy() : emptyCall();

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
