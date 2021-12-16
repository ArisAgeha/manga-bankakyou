import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './renderer/Layout';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

export default function App() {
    return (
        <Router>
            <Layout />
        </Router>
    );
}
