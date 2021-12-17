import React, { Component, SetStateAction, PureComponent } from 'react';
import style from './infoBar.scss';
import { EventHub } from '@/common/eventHub';
import { eventConstant } from '@/common/constant/event.constant';
import { openNotification } from '@/renderer/utils/tools';
import { CopyOutlined, CopyFilled } from '@ant-design/icons';

export interface IInfoBarProps {}

export interface IInfoBarState {
    mainText: string;
    text: TextObj[];
}

export type TextObj = {
    text: string;
    color?: React.CSSProperties['color'];
    margin?: number;
};

class InfoBar extends PureComponent<IInfoBarProps, IInfoBarState> {
    constructor(props: IInfoBarProps) {
        super(props);

        this.state = {
            text: [],
            mainText: '',
        };
    }

    componentDidMount() {
        this.initEvent();
    }

    componentWillUnmount() {
        this.removeEvent();
    }

    initEvent = () => {
        EventHub.on(eventConstant.HINT_TEXT, this.changeText);
        EventHub.on(eventConstant.HINT_MAIN_TEXT, this.changeMainText);

        // window.addEventListener('keydown', this.copyByKeydown);
    };

    removeEvent = () => {
        EventHub.cancel(eventConstant.HINT_TEXT, this.changeText);
        // window.removeEventListener('keydown', this.copyByKeydown);
    };

    copyByKeydown = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key.toLowerCase() === 'c') {
            navigator.clipboard.writeText(this.state.mainText);
            openNotification('复制到剪切板成功', this.state.mainText);
        }
    };

    copyByButton = () => {
        navigator.clipboard.writeText(this.state.mainText);
        openNotification('复制到剪切板成功', '直接按下ctrl + c复制亦可', {
            duration: 4.5,
        });
    };

    changeText = (text: TextObj[]) => {
        this.setState({
            text,
        });
    };

    changeMainText = (mainText: string) => {
        this.setState({
            mainText,
        });
    };

    render(): JSX.Element {
        return (
            <div className={style.infoWrapper}>
                <div className={style.left}>
                    {this.state.mainText}
                    {this.state.mainText && (
                        <CopyFilled
                            style={{ marginLeft: '12px', cursor: 'pointer' }}
                            onClick={this.copyByButton}
                        />
                    )}
                </div>
                <div className={style.right}>
                    {this.state.text.map((obj, index) => (
                        <span
                            className={style.text}
                            style={{
                                color: obj.color || '#fff',
                                marginRight: obj.margin
                                    ? obj.margin + 'px'
                                    : '12px',
                            }}
                            key={index}
                        >
                            {obj.text}
                        </span>
                    ))}
                </div>
            </div>
        );
    }
}

export { InfoBar };
