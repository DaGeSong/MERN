import { useState, useEffect } from 'react'
import Person from './Person'
import personService from './personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  useEffect(
    () => {
      personService.getAll().then((result => setPersons(result)))
    }, [])

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addNew = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name.toUpperCase()).includes(newName.toUpperCase())) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const person = { name: newName, number: newNumber };
      personService.create(person).then(result => setPersons(persons.concat(result)))
      setNewName('');
      setNewNumber('');
    }
  }

  const handleSearch = (event) => {
    setSearchName(event.target.value);

  }

  return (
    <div>
      <div>
        Search Name here: <input type='text' value={searchName} onChange={handleSearch} />
      </div>
      <h2>Phonebook</h2>
      <form onSubmit={addNew}>
        <div>
          name: <input type='text' value={newName} onChange={handleName} required />
        </div>
        <div>
          phone number: <input type='text' value={newNumber} onChange={handleNumber} required />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>
        <ul>
          <Person persons={persons} setPersons={setPersons} searchName={searchName} />
        </ul>
      </div>
    </div>
  )
}

export default App