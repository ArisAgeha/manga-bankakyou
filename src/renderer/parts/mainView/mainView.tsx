import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import style from './mainView.scss';
import { Gesture } from '@/renderer/utils/gesture';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import { withRouter, RouteComponentProps } from 'react-router';

import { routerList } from '../../router';

export interface IMainViewProps extends RouteComponentProps {}

export interface IMainViewState {
    pages: Page[];
    currentPage: Page['id'] | null;
}

export type Page = {
    id: string;
    title: string;
    // type: 'gallery' | 'picture';
    data: any[]; // TODO
};

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
        this.state = {
            pages: [],
            currentPage: null,
        };
    }

    componentDidMount() {
        this.initGesture();
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
        if (!this.state.currentPage) return;
        const currentPageIndex = this.state.pages.findIndex(
            (page) => page.id === this.state.currentPage
        );
        const prevIndex =
            currentPageIndex === 0
                ? this.state.pages.length - 1
                : currentPageIndex - 1;
        const prevPageId = this.state.pages[prevIndex].id;
        this.switchToTab(prevPageId);
    };

    goToNextTab = () => {
        if (!this.state.currentPage) return;
        const currentPageIndex = this.state.pages.findIndex(
            (page) => page.id === this.state.currentPage
        );
        const nextPageIndex =
            currentPageIndex >= this.state.pages.length - 1
                ? 0
                : currentPageIndex + 1;
        const nextPageId = this.state.pages[nextPageIndex].id;
        this.switchToTab(nextPageId);
    };

    componentWillUnmount() {}

    handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab' && e.ctrlKey) {
            if (!this.state.currentPage) return;
            this.goToNextTab();
        } else if (e.key === 'Tab' && e.shiftKey) {
            if (!this.state.currentPage) return;
            this.goToPrevTab();
        }

        if (e.ctrlKey && e.key.toLowerCase() === 'w') {
            if (!this.state.currentPage) return;
            this.closeTab(this.state.currentPage);
        }
    };

    switchToTab(id: string) {
        this.setState({ currentPage: id });
    }

    closeTab(id: string, event?: React.MouseEvent) {
        if (event) event.stopPropagation();

        let currentPage = this.state.currentPage;
        const closeIndex = this.state.pages.findIndex((page) => page.id === id);
        if (this.state.pages[closeIndex].id === currentPage) {
            if (this.state.pages.length === 1) currentPage = null;
            else if (this.state.pages.length > 1 && closeIndex >= 1)
                currentPage = this.state.pages[closeIndex - 1].id;
            else currentPage = this.state.pages[closeIndex + 1].id;
        }

        const newPages = [...this.state.pages];
        newPages.splice(closeIndex, 1);

        this.setState({
            pages: newPages,
            currentPage,
        });
    }

    handleWheelMoveOnTabBar = (event: React.WheelEvent) => {
        this.tabRef.current!.scrollLeft += event.deltaY;
    };

    handleMouseUp(e: React.MouseEvent, id: string) {
        e.preventDefault();
        if (e.button === 1) this.closeTab(id, e);
    }

    renderTab = (props: { page: Page }) => {
        const { page } = props;
        const isSelected = this.state.currentPage === page.id;

        return (
            <div
                onClick={() => this.switchToTab(page.id)}
                onWheel={this.handleWheelMoveOnTabBar}
                className={`${style.tabsItem} ${
                    isSelected ? style.isSelected : ''
                }`}
                key={page.id}
                onMouseUp={(e: React.MouseEvent) => {
                    this.handleMouseUp(e, page.id);
                }}
            >
                <div className={`${style.left} text-ellipsis-1`}>
                    {page.title}
                </div>
                <div
                    className={style.right}
                    onClick={(e) => this.closeTab(page.id, e)}
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
        console.log(window.location.href);

        return (
            <div className={`${style.mainView}`}>
                <div
                    id="tabsWrapper"
                    className={`${style.tabsWrapper} no-scrollbar`}
                    ref={this.tabRef}
                    style={{
                        display: this.state.pages.length > 0 ? 'flex' : 'none',
                    }}
                >
                    {this.state.pages.map((page) => (
                        <Tab key={page.id} page={page} />
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

const MainViewWithRouter = withRouter(({ history, ...props }) => {
    return <MainView {...props} history={history} />;
});

export default MainViewWithRouter;
