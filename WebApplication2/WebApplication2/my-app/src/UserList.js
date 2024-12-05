import React from 'react';

function UserList({ users }) {
    return (
        <div>
            <h3>Seznam uživatelů</h3>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} {user.surname} - {user.email} - {user.telephone} - {user.active ? 'Aktivní' : 'Neaktivní'}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
