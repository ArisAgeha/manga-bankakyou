import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import style from './mainView.scss';
import { Gesture } from '@/renderer/utils/gesture';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import { RouteComponentProps, useHistory, useLocation } from 'react-router';

import { routerList } from '../../router';
import { Tabs, TabsContainer } from '../../context/tabs';

export interface IMainViewProps extends RouteComponentProps {
    tabsList: Tabs[];
    removeTabs(ids: string | string[]): void;
    activeTabId?: string;
    setActiveTabId(val: string): void;
}

export interface IMainViewState {}

export type LoadPictureRequest = {
    id: string;
    urls: string[];
    title: string;
    recursiveDepth?: number;
};

class MainView extends React.PureComponent<IMainViewProps, IMainViewState> {
    private readonly tabRef: React.RefObject<HTMLDivElement>;

    constructor(props: IMainViewProps) {
        super(props);

        this.tabRef = React.createRef();
        this.state = {};
    }

    componentDidMount() {
        this.initGesture();
    }

    componentDidUpdate(prevProps: IMainViewProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.props.setActiveTabId(this.props.location.pathname);
        }
    }

    initGesture = () => {
        Gesture.registry(
            {
                mouseType: 'LR',
            },
            [
                {
                    direction: 'L',
                },
            ],
            this.goToPrevTab
        );

        Gesture.registry(
            {
                mouseType: 'LR',
            },
            [
                {
                    direction: 'R',
                },
            ],
            this.goToNextTab
        );
    };

    goToPrevTab = () => {
        const { activeTabId, tabsList, setActiveTabId } = this.props;
        const targetIndex = this.props.tabsList.findIndex(
            (tab) => tab.id === activeTabId
        );
        if (targetIndex === -1) return;
        const nextIndex =
            targetIndex === 0 ? tabsList.length - 1 : targetIndex - 1;

        const prevTarget = tabsList[nextIndex];

        setActiveTabId(prevTarget.id);
    };

    goToNextTab = () => {
        const { activeTabId, tabsList, setActiveTabId } = this.props;
        const targetIndex = this.props.tabsList.findIndex(
            (tab) => tab.id === activeTabId
        );
        if (targetIndex === -1) return;
        const nextIndex =
            targetIndex === tabsList.length - 1 ? 0 : targetIndex + 1;

        const nextTarget = tabsList[nextIndex];

        setActiveTabId(nextTarget.id);
    };

    componentWillUnmount() {}

    handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab' && e.ctrlKey) {
            if (!this.props.activeTabId) return;
            this.goToNextTab();
        } else if (e.key === 'Tab' && e.shiftKey) {
            if (!this.props.activeTabId) return;
            this.goToPrevTab();
        }

        if (e.ctrlKey && e.key.toLowerCase() === 'w') {
            if (!this.props.activeTabId) return;
            this.closeTab(this.props.activeTabId);
        }
    };

    switchToTab(id: string) {
        this.props.setActiveTabId(id);
        this.props.history.push(id);
    }

    closeTab(id: string, event?: React.MouseEvent) {
        const { removeTabs } = this.props;
        if (event) event.stopPropagation();
        removeTabs(id);
    }

    handleWheelMoveOnTabBar = (event: React.WheelEvent) => {
        this.tabRef.current!.scrollLeft += event.deltaY;
    };

    handleMouseUp(e: React.MouseEvent, id: string) {
        e.preventDefault();
        if (e.button === 1) this.closeTab(id, e);
    }

    renderTab = (props: { tab: Tabs }) => {
        const { tab } = props;
        const isSelected = this.props.activeTabId === tab.id;
        console.log(tab);
        console.log(this.props.activeTabId);

        return (
            <div
                onClick={() => this.switchToTab(tab.id)}
                onWheel={this.handleWheelMoveOnTabBar}
                className={`${style.tabsItem} ${
                    isSelected ? style.isSelected : ''
                }`}
                key={tab.id}
                onMouseUp={(e: React.MouseEvent) => {
                    this.handleMouseUp(e, tab.id);
                }}
            >
                <div className={`${style.left} text-ellipsis-1`}>
                    {tab.name}
                </div>
                <div
                    className={style.right}
                    onClick={(e) => this.closeTab(tab.id, e)}
                >
                    <div className={style.closeWrapper}>
                        <CloseOutlined />
                    </div>
                </div>
            </div>
        );
    };

    render(): JSX.Element {
        const Tab = this.renderTab;
        const { tabsList } = this.props;

        return (
            <div className={`${style.mainView}`}>
                <div
                    id="tabsWrapper"
                    className={`${style.tabsWrapper} no-scrollbar`}
                    ref={this.tabRef}
                    style={{
                        display: tabsList.length > 0 ? 'flex' : 'none',
                    }}
                >
                    {this.props.tabsList.map((tab) => (
                        <Tab key={tab.id} tab={tab} />
                    ))}
                </div>

                <div className={`${style.displayArea}`}>
                    <CacheSwitch>
                        {routerList.map((item) => {
                            return (
                                <CacheRoute
                                    className={style.routeContainer}
                                    exact
                                    key={item.name}
                                    cacheKey={item.name}
                                    path={item.path}
                                    component={item.component}
                                />
                            );
                        })}
                    </CacheSwitch>
                </div>
            </div>
        );
    }
}

function MainViewWithRouterAndContext(MainViewIns: typeof MainView) {
    return function WrappedComponent(props: IMainViewProps) {
        const TabsState = TabsContainer.useContainer();
        const { tabsList, removeTabs, activeTabId, setActiveTabId } = TabsState;

        const history = useHistory();
        const location = useLocation();

        return (
            <MainViewIns
                {...props}
                location={location}
                history={history}
                tabsList={tabsList}
                removeTabs={removeTabs}
                activeTabId={activeTabId}
                setActiveTabId={setActiveTabId}
            />
        );
    };
}

export default MainViewWithRouterAndContext(MainView);
