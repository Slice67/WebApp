import React, { useState } from 'react';
import './UserList.css'
function UserList({ users }) {
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

    return (
        <div>
            <h3>Seznam uživatelů</h3>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} {user.surname} - {user.email} - {user.telephone} - {user.active ? 'Aktivní' : 'Neaktivní'}
                        <button type="submit" onClick={() => openPopup(user)}>Editovat</button>
                    </li>
                ))}
            </ul>

            {isPopupOpen && selectedUser && (
                <div className="popup">
                    <div className="popup-content">
                        <h4>Editace uživatele</h4>
                        <form>
                            <label>
                                Jméno:
                                <input type="text" defaultValue={selectedUser.name} />
                            </label>
                            <br />
                            <label>
                                Příjmení:
                                <input type="text" defaultValue={selectedUser.surname} />
                            </label>
                            <br />
                            <label>
                                Email:
                                <input type="email" defaultValue={selectedUser.email} />
                            </label>
                            <br />
                            <label>
                                Telefon:
                                <input type="tel" defaultValue={selectedUser.telephone} />
                            </label>
                            <br />
                            <label>
                                Aktivní:
                                <input type="checkbox" defaultChecked={selectedUser.active} />
                            </label>
                            <button className="save">Uložit</button>
                            <button onClick={closePopup}>Zavřít</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserList;
