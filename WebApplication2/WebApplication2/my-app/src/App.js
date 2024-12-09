import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddUserForm from './AddUserForm';
import ChangeLogsView from './ChangeLogsView';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <a href="/">Pridat uzivatele</a>
                        </li>
                        <li>
                            <a href="/changelogs">Historie zmen</a>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<AddUserForm />} />
                    <Route path="/changelogs" element={<ChangeLogsView />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
