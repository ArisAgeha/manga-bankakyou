import React, { PureComponent } from 'react';
import style from './FileBar.scss';

import { DirectoryView } from './directoryView/directoryView';

export class FileBar extends PureComponent<IFileBarProps, IFileBarState> {
    constructor(props: IFileBarProps) {
        super(props);
    }

    state: IFileBarState = {
        treeData: [],
    };

    render(): JSX.Element {
        const showDirView =
            this.props.showView === 'directory' ? 'block' : 'none';

        return (
            <div className={style.fileBar}>
                <div
                    className={style.viewWrapper}
                    style={{ display: showDirView }}
                >
                    <DirectoryView></DirectoryView>
                </div>
            </div>
        );
    }
}

export interface IFileBarProps {
    showView: fileBarViewType;
}

export interface IFileBarState {}

export type fileBarViewType = 'directory' | 'collection' | 'tag' | 'author';
