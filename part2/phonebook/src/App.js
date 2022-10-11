import { useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [filteredPerson, setFilteredPerson] = useState(persons)

  const isDupName = () => {
    for (let i = 0; i < persons.length; ++i) {
      if (persons[i].name === newName) {
        return true;
      }
    }
    return false;
  }

  const addName = (event) => {
    event.preventDefault()
    console.log(event.target.value, newName);

    if (isDupName()) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {
      name: newName
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const changeName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const filterPersonByName = (event) => {
    const pattern = event.target.value
    console.log('fillter pattern :', {pattern});
    const matchedPerson = persons.filter((p) => {
      return p.name.search(pattern) != -1;
    })
    console.log('matched person :', matchedPerson)
    setFilteredPerson(matchedPerson)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterHandler={filterPersonByName} />
      <h3>add a new</h3>
      <PersonForm submitHandler={addName} name={newName} nameChangeHandler={changeName} />
      <h2>Numbers</h2>
      <div>
        {filteredPerson.map(person => 
          <Person key={person.name} person={person} />
        )}
      </div>
    </div>
  )
}

export default App;
