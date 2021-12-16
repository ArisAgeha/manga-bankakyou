import React, { PureComponent } from 'react';
import style from './toolsBar.scss';
import {
    ProfileOutlined,
    ImportOutlined,
    TagsOutlined,
    ToolOutlined,
    DeleteOutlined,
    TeamOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import 'reflect-metadata';
import { isDev } from '@/common/utils/functionTools';
import { hintMainText } from '@/renderer/utils/tools';

export interface IToolsBarProps {
    toolsBarWidth: number;
}

export interface IToolsBarState {
    activeIndex: number;
    updating: boolean;
}

class ToolsBar extends PureComponent<IToolsBarProps, IToolsBarState> {
    constructor(props: IToolsBarProps) {
        super(props);

        this.state = {
            activeIndex: 0,
            updating: false,
        };
    }

    componentDidMount() {}

    buttonBox = (props: {
        index: number;
        icon: JSX.Element;
        shouldActive: boolean;
        onClick: any;
    }): JSX.Element => (
        <div
            className={`${style.item} ${
                props.shouldActive && this.state.activeIndex === props.index
                    ? style.isActive
                    : ''
            }`}
            style={{
                width: this.props.toolsBarWidth,
                height: this.props.toolsBarWidth,
            }}
            onClick={props.onClick}
        >
            {props.icon}
        </div>
    );

    topButton = (): JSX.Element => {
        const ButtonBox = this.buttonBox;

        const icons = [
            {
                jsx: (
                    <ProfileOutlined
                        style={{ fontSize: this.props.toolsBarWidth * 0.5 }}
                    />
                ),
                view: 'directory',
                hintMainText: '',
            },
            {
                jsx: (
                    <TagsOutlined
                        style={{ fontSize: this.props.toolsBarWidth * 0.5 }}
                    />
                ),
                view: 'tag',
                hintMainText: '',
            },
            {
                jsx: (
                    <TeamOutlined
                        style={{ fontSize: this.props.toolsBarWidth * 0.5 }}
                    />
                ),
                view: 'author',
                hintMainText: '',
            },
        ];

        return (
            <div className={style.top}>
                {icons.map((buttonObj, index) => (
                    <div
                        key={index}
                        onMouseEnter={() => {
                            hintMainText(buttonObj.hintMainText);
                        }}
                    >
                        <ButtonBox
                            icon={buttonObj.jsx}
                            index={index}
                            shouldActive={true}
                            onClick={() => {
                                this.setState({
                                    activeIndex: index,
                                });
                            }}
                        ></ButtonBox>
                    </div>
                ))}
            </div>
        );
    };

    update = async (url: string) => {
        // TODO
    };

    checkUpdate = async () => {
        // TODO
    };

    bottomButton = (props: any): JSX.Element => {
        const ButtonBox = this.buttonBox;

        const buttons = [
            // dev
            {
                isDev: true,
                jsx: (
                    <DeleteOutlined
                        style={{ fontSize: this.props.toolsBarWidth * 0.5 }}
                    />
                ),
                onClick: async () => {},
            },
            {
                isDev: true,
                jsx: (
                    <ToolOutlined
                        style={{ fontSize: this.props.toolsBarWidth * 0.5 }}
                    />
                ),
                onClick: async () => {},
            },
            // import directory button
            {
                jsx: (
                    <SyncOutlined
                        style={{ fontSize: this.props.toolsBarWidth * 0.5 }}
                        spin={this.state.updating}
                    />
                ),
                onClick: this.checkUpdate,
                hintMainText: '',
            },
            {
                jsx: (
                    <ImportOutlined
                        style={{ fontSize: this.props.toolsBarWidth * 0.5 }}
                    />
                ),
                onClick: () => {},
                hintMainText: '',
            },
            // setting button
            // {
            //     jsx: <SettingOutlined style={{ fontSize: this.props.toolsBarWidth * 0.5 }} />,
            //     onClick: () => { }
            // }
        ];

        const buttonsJSX = buttons
            .filter(
                (buttonObj) => (isDev() && buttonObj.isDev) || !buttonObj.isDev
            )
            .map((buttonObj, index) => (
                <div
                    key={index}
                    onMouseEnter={() => {
                        hintMainText(buttonObj.hintMainText);
                    }}
                >
                    <ButtonBox
                        icon={buttonObj.jsx}
                        index={index}
                        shouldActive={false}
                        onClick={buttonObj.onClick}
                    ></ButtonBox>
                </div>
            ));

        return <div className={style.top}>{buttonsJSX}</div>;
    };

    render(): JSX.Element {
        const TopButton = this.topButton;
        const BottomButton = this.bottomButton;
        return (
            <div className={style.toolsBarWrapper}>
                <TopButton></TopButton>
                <BottomButton></BottomButton>
            </div>
        );
    }
}

export { ToolsBar };
