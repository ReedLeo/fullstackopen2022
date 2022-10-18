import { useEffect, useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/person'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({})
  const [filteredPerson, setFilteredPerson] = useState(persons)
  const [notifyMsg, setNotifyMsg] = useState({txt:'some notification message...', isErr:false})

  const hook = () => {
    console.log('effect');
    personService
      .getAll()
      .then(returnedPersons=> {
        console.log('promise fulfilled with ', returnedPersons);
        setPersons(returnedPersons)
        setFilteredPerson(returnedPersons)
      })
  }
  useEffect(hook, [])
  console.log('render ', persons.length, 'persons');
  

  const findDupNameId = () => {
    for (let i = 0; i < persons.length; ++i) {
      if (persons[i].name === newPerson.name) {
        return persons[i].id;
      }
    }
    return -1;
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log('addPerson ', newPerson);

    const dupId = findDupNameId() 
    if ((dupId > -1)) {
      if (window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`)
          ) {
          // alert(`${newPerson.name} is already added to phonebook`)
          personService
            .update(dupId, newPerson)
            .then(returnedData => {
              console.log('The updated person is ', returnedData)
              const updatedPersons = persons.map(p => p.id === returnedData.id ? returnedData : p)
              setPersons(updatedPersons)
              setFilteredPerson(updatedPersons)
              setNotifyMsg({txt:`Updated ${newPerson.name} with number of ${newPerson.number}`, isErr:false})
              // setNewPerson({})
            })
      }
    } else {  // there is a new one to be added.
      personService
        .create(newPerson)
        .then(returnedPerson => {
          console.log('added a new person to server: ', returnedPerson)
          const newPersons = persons.concat(returnedPerson)
          setPersons(newPersons)
          setFilteredPerson(newPersons)
          setNotifyMsg({txt:`Added ${newPerson.name}`, isErr:false})
          // setNewPerson({})
        })
    }
  }

  const changePerson = (event) => {
    console.log('In changePerson ', event.target);
    const newOne = {...newPerson, [event.target.id]:event.target.value}
    console.log('In changePerson, the newOne is ', newOne);
    
    setNewPerson(newOne)
  }

  const filterPersonByName = (event) => {
    const pattern = event.target.value
    console.log('fillter pattern :', {pattern});
    const matchedPerson = persons.filter((p) => {
      return p.name.toLowerCase().search(pattern.toLowerCase()) !== -1;
    })
    console.log('matched person :', matchedPerson)
    setFilteredPerson(matchedPerson)
  }

  const deleteHandler = (event) => {
    event.preventDefault()
    // !!Caution: the typeof(event.target.id) is string, not an integer.
    const personId = parseInt(event.target.id)
    console.log('All persons :', persons);
    
    console.log('Person ID to delete is ', personId);
    
    const personToDelete = persons.find(p => p.id === personId)
    console.log('delete the person :', personToDelete);
    if (window.confirm(`Do you really want to delete the person ${personId}`)) {
      // do delete
      personService
        .del(personId)
        .then(returnedData => {
          console.log('Returned by HTTP-Delete :', returnedData)
          const updatedPersons = persons.filter(p => p.id !== personId)
          setPersons(updatedPersons)
          setFilteredPerson(updatedPersons)
          setNotifyMsg({txt:`Deleted ${personToDelete.name}`, isErr:false})
          // setNewPerson({})
        })            
        .catch(error => {
          console.log('Error ', error);
          
          setNotifyMsg({txt:`Information of ${newPerson.name} has already been removed from server`, isErr:true})
          const correctPersons = persons.filter(p => p.name !== newPerson.name)
          setPersons(correctPersons)
          setFilteredPerson(correctPersons)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={notifyMsg}/>
      <Filter filterHandler={filterPersonByName} />
      <h3>add a new</h3>
      <PersonForm submitHandler={addPerson} person={newPerson} changeHandler={changePerson} />
      <h2>Numbers</h2>
      <div>
        {filteredPerson.map(person => 
          <Person key={person.id} person={person} deleteHandler={deleteHandler}/>
        )}
      </div>
    </div>
  )
}

export default App;
