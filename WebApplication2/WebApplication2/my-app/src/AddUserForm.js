import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import './AddUserForm.css'

function AddUserForm() {
    const [name, setName] = useState(''); // name, setName - proměnné, useState - spravuje stav v komponentě (inicializuje se s prázdným řetezcem '')
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [active, setActive] = useState(false); //aby checkbox nebyl zaškrtnutý
    const [errorMessage, setErrorMessage] = useState('');

    const [users, setUsers] = useState([]); // stav pro seznam uživatelů

    const refreshUsers = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/users');
            const data = await response.json();
            if (response.ok) {
                setUsers(data);
            } else {
                setErrorMessage('Chyba při načítání uživatelů');
            }
        } catch (error) { setErrorMessage('Nastala chyba při připojování k serveru'); }
    };

    useEffect(() => {
        refreshUsers(); //načtení uživatelů při prvním renderu
    }, []);

    const updateUser = async (updatedUser) => {
        try {
            const response = await fetch(`http://localhost:5001/api/users/${updatedUser.id}`, {
                method: 'PUT', //pro odesílání dat na server
                headers: { //metadata
                    'Content-Type': 'application/json' //typ dat je ve formátu JSON
                },
                body: JSON.stringify(updatedUser) //převede objekt na JSON řetězec
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Chyba při aktualizaci uživatele.');
                return;
            }

            // Ověření, zda odpověď obsahuje tělo JSON
            if (response.status !== 204) {
                const data = await response.json();
                console.log("Odpověď serveru: ", data);
            } else {
                console.log("Odpověd server: Žádný obsah"); //nastane pokaždé když aktualizuji uživatele
            }

            alert('Uživatel byl aktualizován.');
            refreshUsers(); // Aktualizace seznamu uživatelů
        } catch (error) {
            console.error('Chyba při aktualizaci uživatele:', error);
            setErrorMessage('Nastala chyba při odesílání požadavku. Přesto se uživatel upraví'); // přesto se uživatel upraví v databázi
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault(); // zabraňuje výchozímu chování formuláře

        const user = { //objekt user
            name,
            surname,
            email,
            telephone,
            active
        };

        try {
            const response = await fetch('http://localhost:5001/api/users', { //adresa API endpointu
                method: 'POST', //pro odesílání dat na server
                headers: { //metadata
                    'Content-Type': 'application/json' //typ dat je ve formátu JSON
                },
                body: JSON.stringify(user) //převede objekt na JSON řetězec
            });

            if (response.ok) {
                alert('Uživatel byl úspěšně přidán!');
                refreshUsers();
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Něco se pokazilo při přidávání uživatele.');
                alert('Chyba při přidávání uživatele: ' + (errorData.message || 'Neznámá chyba'));
            }
        } catch (error) {
            console.error("Chyba při odesílání požadavku:", error);
            setErrorMessage('Nastala chyba při odesílání požadavku. Zkontrolujte připojení.');
            alert('Něco se pokazilo při odesílání požadavku.');
        }
    };

    return (
        <div className="container">
            <h2>Přidat nového uživatele</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Jméno:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} // událostní handler, e - objekt události (event)
                    />
                </div>
                <div>
                    <label htmlFor="surname">Příjmení:</label>
                    <input
                        type="text"
                        id="surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="telephone">Telefon:</label>
                    <input
                        type="tel"
                        id="telephone"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="active">Aktivní:</label>
                    <input
                        type="checkbox"
                        id="active"
                        checked={active}
                        onChange={(e) => setActive(e.target.checked)}
                    />
                </div>
                <button type="submit">Přidat uživatele</button>
            </form>

            {errorMessage && <div className="error-message">Chyba: {errorMessage}</div>} { }

            <section>
                <UserList users={users} refreshUsers={refreshUsers} updateUser={updateUser} />
            </section>

        </div>
    );
}

export default AddUserForm;