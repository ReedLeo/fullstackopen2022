const PersonForm = ({submitHandler, person, changeHandler}) => {
    return  (
        <form onSubmit={submitHandler}>
        <div>
          name: <input id="name"  onChange={changeHandler} />
        </div>
        <div>
          number: <input id="number"  onChange={changeHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm