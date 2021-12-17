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
import { RouteComponentProps, withRouter } from 'react-router-dom';

export interface IToolsBarProps extends RouteComponentProps {
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
                hintMainText: '',
                onClick: () => {
                    console.log(window.location.href);
                    this.props.history.push('/');
                },
            },
            {
                jsx: (
                    <ProfileOutlined
                        style={{ fontSize: this.props.toolsBarWidth * 0.5 }}
                    />
                ),
                hintMainText: '',
                onClick: () => {
                    console.log(window.location.href);
                    this.props.history.push('/yapi');
                },
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
                            onClick={buttonObj.onClick}
                        />
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

    render(): JSX.Element {
        const TopButton = this.topButton;
        console.log(this.props.toolsBarWidth);

        return (
            <div className={style.toolsBarWrapper}>
                <TopButton></TopButton>
            </div>
        );
    }
}

const ToolsBarWithRouter = withRouter(({ ...props }) => {
    return <ToolsBar {...props} />;
});
export default ToolsBarWithRouter;
