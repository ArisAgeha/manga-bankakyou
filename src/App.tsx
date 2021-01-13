import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Hello = () => {
    return (
        <div>
            <div className="Hello">
                <a
                    href="https://electron-react-boilerplate.js.org/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <button type="button">
                        <span role="img" aria-label="books">
                            📚
                        </span>
                        Read our docs
                    </button>
                </a>
            </div>
        </div>
    );
};

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Hello} />
            </Switch>
        </Router>
    );
}
