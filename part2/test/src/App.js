import {useEffect, useState} from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(    'a new note...'  ) 
  const [showAll, setShowAll] = useState(true)
  const [errMsg, setErrMsg] = useState('some error happed...')

  const hook = () => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialNotes=> {
        console.log('promise fulfilled')
        setNotes(initialNotes)
    })
  }
  useEffect(hook, [])
  console.log('render', notes.length, 'notes')
  

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
      // id: notes.length + 1,
    }

    // setNotes(notes.concat(noteObject))
    // setNewNote('')
    noteService
      .create(noteObject)
      .then(returnedNote => {
        console.log(returnedNote);
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNotChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

   noteService
     .update(id, changedNote)
     .then(returnedNote => {
      setNotes(notes.map(n => n.id !== id ? n : returnedNote))
    })
     .catch(error => {
        setErrMsg(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrMsg(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
     })
    
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errMsg} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote} 
          onChange={handleNotChange}
        />        
        <button type="submit">save</button>
      </form>
      <Footer />   
    </div>
  )
}

export default App;
