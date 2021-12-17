import React, { useEffect, useMemo, useState } from 'react';
import style from './index.scss';
import { Badge, Button, Input, Select, Tag } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { openNotification } from '../../utils/tools';

export interface Props {}

const NAME = '字段名';
const TYPE = '类型';
const NECESSARY = '是否必须';
const DEFAULT = '默认值';
const NOTE = '备注';
const INFO = '其他信息';

const columnOptions = [NAME, TYPE, NECESSARY, DEFAULT, NOTE, INFO];

const YapiTools: React.FC<Props> = ({}) => {
    const [source, setSource] = useState<string>('');
    const [preview, setPreview] = useState<string>('');
    const [columns, setColumns] = useState<string[]>([
        NAME,
        TYPE,
        NECESSARY,
        NOTE,
    ]);

    useEffect(() => {
        document.addEventListener('paste', (event) => {
            if (!event.clipboardData) return;
            const text = event.clipboardData.getData('text/plain');
            setSource(text);

            const html = event.clipboardData.getData('text/html');
            const $doc = new DOMParser().parseFromString(html, 'text/html');
            const table = $doc.querySelector('table');
            if (!table) return;
            console.log(table);
            const trs = table?.querySelectorAll('tr');
            const res: string[][] = [];

            trs?.forEach((tr) => {
                const tds = tr.querySelectorAll('td');
                const trRes: string[] = [];

                tds.forEach((td) => {
                    trRes.push(td.innerText || '');
                });

                res.push(trRes);
            });

            const transformedRes = res.reduce((prev, cur, index) => {
                prev[cur[0]] = `${cur[1]} // `;
                const rest = cur.slice(2).filter((item) => !!item);
                prev[cur[0]] += rest.reduce((rPrev, rCur, rIndex) => {
                    if (rIndex === 0) return rCur;
                    return `${rPrev} | ${rCur}`;
                }, '');

                return prev;
            }, {} as { [key: string]: string });

            const parsedRes = JSON.stringify(transformedRes, null, 2).replace(
                /"/g,
                ''
            );

            setPreview(parsedRes);
        });
    }, []);

    const handleCopyText = useMemoizedFn(() => {
        navigator.clipboard.writeText(preview);
        openNotification('复制到剪切板成功');
    });

    const handleChangeTag = useMemoizedFn((tag: string) => {
        let newColumns = [...columns];
        console.log(newColumns);

        if (newColumns.includes(tag)) {
            newColumns = newColumns.filter((item) => item !== tag);
        } else {
            newColumns.push(tag);
        }

        console.log(newColumns);
        setColumns(newColumns);
    });

    return (
        <div className={style.container}>
            <div className={style.left}>
                <div className={style.tagBox}>
                    {columnOptions.map((item) => {
                        const index = columns.findIndex((tab) => item === tab);

                        return (
                            <Tag
                                onClick={() => {
                                    handleChangeTag(item);
                                }}
                                className={style.tag}
                                key={item}
                                color={index !== -1 ? 'blue' : 'default'}
                            >
                                <div className={style.tagInner}>
                                    <span className={style.text}>{item}</span>
                                    {index !== -1 && (
                                        <Badge
                                            style={{
                                                backgroundColor: '#096dd9',
                                            }}
                                            size="small"
                                            count={index + 1}
                                        />
                                    )}
                                </div>
                            </Tag>
                        );
                    })}
                </div>

                <Input.TextArea
                    value={source}
                    spellCheck={false}
                    // onChange={(event) => {
                    //     setSource(event.target.value);
                    // }}
                    className={style.textarea}
                />
            </div>

            <div className={style.right}>
                <div className={style.preview}>
                    <Input.TextArea
                        style={{ width: '100%', height: '100%' }}
                        value={preview}
                        spellCheck={false}
                    />
                    <Button
                        className={style.copyButton}
                        onClick={handleCopyText}
                        type="primary"
                    >
                        复制
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default YapiTools;
