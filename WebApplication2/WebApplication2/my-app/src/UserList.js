import React, { useState } from 'react';
import './UserList.css'
function UserList({ users, refreshUsers ,updateUser }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const openPopup = (user) => {
        setSelectedUser(user); //nastavím aktuálního uživatele
        setIsPopupOpen(true); //zobrazím formulář
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedUser(null); //reset aktuálního uživatele
    };

    const handleSave = async () => {
        if (!selectedUser) return;
        try {
            await updateUser(selectedUser); // Zavolání propsy updateUser
            refreshUsers();
            closePopup(); // Zavření popupu
        } catch (error) {
            console.error('Chyba při ukládání uživatele:', error);
        }
    };

    return (
        <div>
            <h3>Seznam uživatelů</h3>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} {user.surname} - {user.email} - {user.telephone} -{' '}
                        {user.active ? 'Aktivní' : 'Neaktivní'}
                        <button type="button" onClick={() => openPopup(user)}>Editovat</button>
                    </li>
                ))}
            </ul>

            {isPopupOpen && selectedUser && (
                <div className="popup">
                    <div className="popup-content">
                        <h4>Editace uživatele</h4>
                        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                            <label>
                                Jméno:
                                <input
                                    type="text"
                                    value={selectedUser.name}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                                />
                            </label>
                            <br />
                            <label>
                                Příjmení:
                                <input
                                    type="text"
                                    value={selectedUser.surname}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, surname: e.target.value })}
                                />
                            </label>
                            <br />
                            <label>
                                Email:
                                <input
                                    type="email"
                                    value={selectedUser.email}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                />
                            </label>
                            <br />
                            <label>
                                Telefon:
                                <input
                                    type="tel"
                                    value={selectedUser.telephone}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, telephone: e.target.value })}
                                />
                            </label>
                            <br />
                            <label>
                                Aktivní:
                                <input
                                    type="checkbox"
                                    checked={selectedUser.active}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, active: e.target.checked })}
                                />
                            </label>
                            <br />
                            <button type="submit">Uložit</button>
                            <button type="button" onClick={closePopup}>Zavřít</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserList;
