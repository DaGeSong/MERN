import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040123456', id: 1 },
    { name: 'Ada Lovelace', number: '39445323523', id: 2 },
    { name: 'Dan Abramov', number: '1243234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39236423122', id: 4 }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

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
      const person = { name: newName, number: newNumber, id: persons.length + 1 };
      setPersons(persons.concat(person));
      setNewName('');
      setNewNumber('');
    }
  }

  const handleSearch = (event) => {
    setSearchName(event.target.value);

  }

  const allResults = persons.map((person) => <li key={person.id}>{person.name}: {person.number}</li>);
  const searchedResults = persons.filter((person) => person.name.toUpperCase().startsWith(searchName.toUpperCase())).map((person) => <li key={person.id}>{person.name}: {person.number}</li>);

  return (
    <div>
      <div>
        Search Name here: <input type='text' value={searchName} onChange={handleSearch} />
      </div>
      <h2>Phonebook</h2>
      <form onSubmit={addNew}>
        <div>
          name: <input type='text' value={newName} onChange={handleName} />
        </div>
        <div>
          phone number: <input type='number' value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>
        <ul>
          {!searchName ? allResults : searchedResults}
        </ul>
      </div>

    </div>
  )
}

export default App