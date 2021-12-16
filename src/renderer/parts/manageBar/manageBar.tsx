import * as React from 'react';

export interface IManageBarState {}

export class ManageBar extends React.PureComponent<{}, IManageBarState> {
    constructor(props: {}) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.initEvent();
        this.initIpc();
    }

    componentWillUnmount() {
        this.removeEvent();
    }

    initIpc() {}

    initEvent() {}

    removeEvent() {}

    render() {
        return <div></div>;
    }
}
