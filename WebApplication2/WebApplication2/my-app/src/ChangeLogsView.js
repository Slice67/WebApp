import React, { useState, useEffect } from 'react';
import './ChangeLogsView.css';

function ChangeLogsView() {
    const [changeLogs, setChangeLogs] = useState([]);

    const fetchChangeLogs = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/changelogs');
            const data = await response.json();
            if (response.ok) {
                setChangeLogs(data);
            } else {
                console.error('Chyba při načítání změn:', data.message);
            }
        } catch (error) {
            console.error('Nastala chyba při připojování k serveru:', error);
        }
    };

    useEffect(() => {
        fetchChangeLogs();
    }, []);

    return (
        <div className="container">
            <h2>Historie změn</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID Uživatele</th>
                        <th>Operace</th>
                        <th>Atribut</th>
                        <th>Stará Hodnota</th>
                        <th>Nová Hodnota</th>
                        <th>Datum Změny</th>
                    </tr>
                </thead>
                <tbody>
                    {changeLogs.map((log) => (
                        <tr key={log.id}>
                            <td>{log.userId}</td>
                            <td>{log.operation}</td>
                            <td>{log.changedAttribute}</td>
                            <td>{log.oldValue}</td>
                            <td>{log.newValue}</td>
                            <td>{new Date(log.changeDate).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ChangeLogsView;
