import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { TabsContainer } from './renderer/context/tabs';
import Layout from './renderer/Layout';

export default function App() {
    return (
        <Router>
            <TabsContainer.Provider>
                <Layout />
            </TabsContainer.Provider>
        </Router>
    );
}
