import React, { PureComponent } from 'react';
import style from './toolsBar.scss';
import { ProfileOutlined } from '@ant-design/icons';
import 'reflect-metadata';
import { hintMainText } from '@/renderer/utils/tools';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { TabsContainer } from '../../context/tabs';

export interface IToolsBarProps extends RouteComponentProps {
    toolsBarWidth: number;
    openTabs(pathname: string, name: string): void;
}

export interface IToolsBarState {
    activeIndex: number;
}

class ToolsBar extends PureComponent<IToolsBarProps, IToolsBarState> {
    constructor(props: IToolsBarProps) {
        super(props);

        this.state = {
            activeIndex: -1,
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
                    this.props.openTabs('/', '首页');
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
                    this.props.openTabs('/yapi', 'yapi工具');
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

function ToolsBarWithRouter(ToolsBarIns: typeof ToolsBar) {
    return function WrappedComponent(props: IToolsBarProps) {
        const TabsState = TabsContainer.useContainer();
        const { openTabs } = TabsState;

        const history = useHistory();

        return <ToolsBarIns {...props} history={history} openTabs={openTabs} />;
    };
}

export default ToolsBarWithRouter(ToolsBar);
