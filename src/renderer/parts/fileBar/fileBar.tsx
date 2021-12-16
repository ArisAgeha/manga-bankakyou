import React, { PureComponent } from 'react';
import style from './FileBar.scss';

export interface IFileBarProps {}

export interface IFileBarState {}
export class FileBar extends PureComponent<IFileBarProps, IFileBarState> {
    constructor(props: IFileBarProps) {
        super(props);

        this.state = {};
    }

    render(): JSX.Element {
        return (
            <div className={style.fileBar}>
                <div className={style.viewWrapper}></div>
            </div>
        );
    }
}
