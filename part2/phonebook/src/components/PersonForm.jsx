import {useState} from 'react'

function PersonForm({registerNewPerson}) {
    const [newName, setNewName] = useState('')
    const [newPhoneNumber, setNewPhoneNumber] = useState('')

    const handleNameInputChange = (event) => {
        setNewName(event.target.value)
    }

    const handlePhoneNumberInputChange = (event) => {
        setNewPhoneNumber(event.target.value)
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        if(newName !== "" && newPhoneNumber !== "") {
          registerNewPerson(newName, newPhoneNumber, () => {
            setNewName("")
            setNewPhoneNumber("")
          })
        }
    }
    
    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                name: <input value={newName} onChange={handleNameInputChange}/>
            </div>
            <div>
                phone: <input value={newPhoneNumber} onChange={handlePhoneNumberInputChange}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm