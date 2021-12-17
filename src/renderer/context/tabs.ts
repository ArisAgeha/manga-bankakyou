import { useMemo, useState } from 'react';
import { createContainer } from 'unstated-next';
import { useMemoizedFn } from 'ahooks';

export interface Tabs {
    id: string;
    name: string;
}

function tabsHooks() {
    const [tabsList, setTabsList] = useState<Tabs[]>([]);
    const [activeTabId, setActiveTabId] = useState<string>();

    const activeTab = useMemo(() => {
        return tabsList.find((item) => item.id === activeTabId);
    }, [tabsList, activeTabId]);

    const removeTabs = useMemoizedFn((id: string | string[]) => {
        const idsArray = Array.isArray(id) ? id : [id];

        const newTabsList = tabsList.filter(
            (item) => !idsArray.includes(item.id)
        );
        setTabsList(newTabsList);
    });

    const addTabs = useMemoizedFn((tabs: Tabs | Tabs[], index?: number) => {
        const tabsArray = Array.isArray(tabs) ? tabs : [tabs];

        const newTabsList = [...tabsList];
        const insertTabsList = [...tabsArray].filter((tab) =>
            tabsList.every((exsitsTab) => tab.id !== exsitsTab.id)
        );

        if (typeof index === 'number') {
            newTabsList.splice(index, 0, ...insertTabsList);
        } else {
            newTabsList.push(...insertTabsList);
        }

        setTabsList(newTabsList);
    });

    const openTabs = useMemoizedFn((pathname: string, name: string) => {
        addTabs({ id: pathname, name });
        setActiveTabId(pathname);
    });

    return {
        tabsList,
        removeTabs,
        addTabs,
        activeTab,
        activeTabId,
        setActiveTabId,
        openTabs,
    };
}

export const TabsContainer = createContainer(tabsHooks);
