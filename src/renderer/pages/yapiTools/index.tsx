import React, { useEffect, useMemo, useState } from 'react';
import style from './index.scss';
import { Badge, Button, Input, message, Select, Tag } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { openNotification } from '../../utils/tools';
import { isNumber } from '../../../common/utils/types';

export interface Props {}

interface YapiItem {
    name?: string;
    type?: string;
    necessary?: string;
    default?: string;
    note?: string;
    info?: string;
    children?: YapiItem[];
}

type KeyType = Exclude<keyof YapiItem, 'children'>;

const columnOptions: KeyType[] = [
    'name',
    'type',
    'necessary',
    'default',
    'note',
    'info',
];

const YapiTools: React.FC<Props> = ({}) => {
    const [source, setSource] = useState<string>('');
    const [preview, setPreview] = useState<string>('');
    const [columns, setColumns] = useState<string[]>([]);

    useEffect(() => {
        document.addEventListener('paste', (event) => {
            if (!event.clipboardData) return;
            const text = event.clipboardData.getData('text/plain');
            setSource(text);

            const html = event.clipboardData.getData('text/html');
            const $doc = new DOMParser().parseFromString(html, 'text/html');
            const table = $doc.querySelector('table');
            if (!table) return;
            const trs = table?.querySelectorAll('tr');
            const res: YapiItem[] = [];

            let basicLevel = 99999;
            // 1. 将table DOM结构解析为对象信息
            trs?.forEach((tr, trIndex) => {
                const tds = tr.querySelectorAll('td');
                const trRes: YapiItem = {};

                tds.forEach((td, index) => {
                    const field: KeyType = columnOptions[index];
                    trRes[field] = td.innerText;
                });

                const matches = tr.className.match(/level-(\d+)/);

                let level = Number(matches && matches[1]);
                basicLevel = level < basicLevel ? level : basicLevel;

                // 通过类名.xxx-level-\d+判断层级，并且拼接到对应的层级
                if (isNumber(level) && level > basicLevel) {
                    let target = res[res.length - 1];

                    while (level > 0) {
                        if (!target) {
                            if (Object.keys(trRes).length > 0) {
                                res.push(trRes);
                                message.warning(
                                    '您复制的表信息未从第一层级开始复制，可能会导致结构解析出错'
                                );
                            }
                            return;
                        }

                        level--;

                        if (!target.children) target.children = [];

                        if (level === 0) {
                            target.children.push(trRes);
                        } else {
                            target =
                                target.children[target.children.length - 1];
                        }
                    }
                } else {
                    res.push(trRes);
                }
            });

            // 2. 将对对象信息转换为类ts结构
            const transformedRes = res.reduce((prev, cur, index) => {
                const curRes = transformObj(cur);

                const necessarySymbol = getNecessarySymbol(
                    cur.necessary as string
                );

                return {
                    ...prev,
                    [`${cur.name}${necessarySymbol}` as string]: curRes,
                };
            }, {} as { [key: string]: string });

            // 3. 将类ts结构对象转换为TS interface字符串
            const parsedRes = JSON.stringify(transformedRes, null, 2)
                .replace(/"/g, '')
                .replace(/: \[/g, ': Array<')
                .replace(/\],/g, '>;');

            setPreview(parsedRes);
        });
    }, []);

    // 工具函数
    function transformObj(data: YapiItem): any {
        let type =
            (data.type && data.type.toLocaleLowerCase().replace(/\s/g, '')) ||
            '';

        // 数字类型处理
        if (['int', 'bigint', 'integer', 'number'].includes(type)) {
            data.type = 'number';
            type = data.type;

            const strRes = `${data.type} //`;
            return concat(strRes, data.default, data.note, data.info);
        }
        // 字符串类型处理
        else if (['str', 'string'].includes(type)) {
            data.type = 'string';
            type = data.type;

            const strRes = `${data.type} //`;
            return concat(strRes, data.default, data.note, data.info);
        }
        // 对象或数字类型处理
        else if (
            ['object', 'object[]', 'Array<object>'].includes(type) &&
            Array.isArray(data.children)
        ) {
            const res = data.children.reduce((prev, cur) => {
                const necessarySymbol = getNecessarySymbol(
                    cur.necessary as string
                );

                return {
                    ...prev,
                    [`${cur.name}${necessarySymbol}` as string]: transformObj(
                        cur
                    ),
                };
            }, {});

            return type === 'object[]' ? [res] : res;
        }
        // 其他类型处理
        else {
            const strRes = `${data.type} //`;
            return concat(
                strRes,
                data.necessary,
                data.default,
                data.note,
                data.info
            );
        }
    }

    // 工具函数
    function getNecessarySymbol(str: string) {
        return ['是', '必须'].includes(str) ? '' : '?';
    }

    // 工具函数
    function concat(str1: string, ...strArray: (string | undefined)[]) {
        strArray.forEach((str2, index) => {
            if (str2)
                str1 = / \/\/$/.test(str1)
                    ? `${str1} ${str2}`
                    : `${str1} | ${str2}`;
        });

        str1 = str1.replace(/\/\/,{0,1}$/, '');

        return str1;
    }

    const handleCopyText = useMemoizedFn(() => {
        navigator.clipboard.writeText(preview);
        openNotification('复制到剪切板成功');
    });

    // 备用
    const handleChangeTag = useMemoizedFn((tag: string) => {
        let newColumns = [...columns];

        if (newColumns.includes(tag)) {
            newColumns = newColumns.filter((item) => item !== tag);
        } else {
            newColumns.push(tag);
        }

        setColumns(newColumns);
    });

    return (
        <div className={style.container}>
            <div className={style.left}>
                {/* <div className={style.tagBox}>
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
                </div> */}

                <Input.TextArea
                    value={source}
                    spellCheck={false}
                    placeholder="将复制好的yapi表格内容直接粘贴在此处..."
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
                        placeholder="解析结果..."
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
