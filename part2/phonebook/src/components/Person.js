const Person = ({person, deleteHandler}) => {
    return (
      <p>
        {person.name} {person.number}
        <button onClick={deleteHandler} id={person.id}>delete</button>
      </p>
    )
  }
  
  export default Person;