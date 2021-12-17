import React, { useEffect } from 'react';
import style from './index.scss';
import { Input } from 'antd';

export interface Props {}

const YapiTools: React.FC<Props> = ({}) => {
    return (
        <div className={style.container}>
            <div className={style.left}>
                <Input.TextArea style={{ width: '100%' }} />
            </div>

            <div className={style.right}>
                <div className={style.preview}></div>
            </div>
        </div>
    );
};

export default YapiTools;
