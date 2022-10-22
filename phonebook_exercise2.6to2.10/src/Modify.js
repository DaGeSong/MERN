import React from 'react'
import personService from './personService'

export default function Modify({ persons, setPersons, modifyID, newModifyName, setNewModifyName, newModifyNumber, setNewModifyNumber, setmodifyYes }) {

    const handleModifyName = (event) => {
        setNewModifyName(event.target.value)
    }

    const handleModifyNumber = (event) => {
        setNewModifyNumber(event.target.value)
    }

    const handleModifySubmit = (event) => {
        event.preventDefault()
        const modifiedPerson = { name: newModifyName, number: newModifyNumber, id: modifyID }
        setPersons(persons.filter(person => person.id !== modifyID).concat(modifiedPerson))
        setmodifyYes(false)
        personService.update(modifiedPerson.id, { name: newModifyName, number: newModifyNumber })
    }

    return (
        <div>
            <form onSubmit={handleModifySubmit}>
                <div>
                    Modify name: <input type='text' value={newModifyName} onChange={handleModifyName} required />
                </div>
                <div>
                    Modify phone number: <input type='text' value={newModifyNumber} onChange={handleModifyNumber} required />
                </div>
                <div>
                    <button type="submit">Modify</button>
                </div>
            </form>
        </div>
    )
}
