const PersonForm = ({submitHandler, name, nameChangeHandler}) => {
    return  (
        <form onSubmit={submitHandler}>
        <div>
          name: <input value={name} onChange={nameChangeHandler} />
        </div>
        <div>
          number: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm