import React, { useState } from 'react'
import Modify from './Modify'
import personService from './personService';

export default function Person({ persons, setPersons, searchName }) {

    const searchedPersons = persons.filter(person => person.name.toUpperCase().includes(searchName.toUpperCase()));
    const [modifyYes, setmodifyYes] = useState(false)
    const [newModifyName, setNewModifyName] = useState('')
    const [newModifyNumber, setNewModifyNumber] = useState('')
    const [modifyID, setModifyID] = useState()

    const handleDelete = (id) => {
        persons = persons.filter(person => person.id !== id)
        setPersons(persons)
        personService.delet(id)
    };

    const handleModify = (id, name, number) => {
        setmodifyYes(!modifyYes)
        setNewModifyName(name)
        setNewModifyNumber(number)
        setModifyID(id)
    };

    const listAllPersons = persons.map((person => <li key={person.id}>{person.name}: {person.number} <button onClick={() => handleDelete(person.id)}>Delete</button> <button onClick={() => handleModify(person.id, person.name, person.number)}>Modify</button></li>))
    const listSearchedPersons = searchedPersons.map((person => <li key={person.id}>{person.name}: {person.number} <button onClick={() => handleDelete(person.id)}>Delete</button> <button onClick={() => handleModify(person.id, person.name, person.number)}>Modify</button></li>))
    return (
        <div>
            {!searchName ? listAllPersons : listSearchedPersons}
            {modifyYes ? <Modify persons={persons} setPersons={setPersons} modifyID={modifyID} newModifyName={newModifyName} setNewModifyName={setNewModifyName} newModifyNumber={newModifyNumber} setNewModifyNumber={setNewModifyNumber} setmodifyYes={setmodifyYes} /> : null}
        </div>
    )
}
