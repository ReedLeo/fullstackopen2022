import { useEffect, useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([
  ]) 
  const [newName, setNewName] = useState('')
  const [filteredPerson, setFilteredPerson] = useState(persons)

  const hook = () => {
    console.log('effect');
    axios
      .get("http://192.168.29.144:3001/persons")
      .then(response => {
        console.log('promise fulfilled');
        setPersons(response.data)
        setFilteredPerson(response.data)
      })
  }
  useEffect(hook, [])
  console.log('render ', persons.length, 'persons');
  

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
      return p.name.toLowerCase().search(pattern.toLowerCase()) != -1;
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
