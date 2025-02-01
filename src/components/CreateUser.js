import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateUsers() {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    function handleSubmit(event) {
        event.preventDefault();
        inputs.option = "Salvar dados";
        axios.post("php/api.php", inputs).then(function(response) {
            if (response.data.status === 1) {
                alert(response.data.msg)
            }
            navigate("/");
        })
    }
    
    return(
        <div>
            <h1>Create User</h1>

            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" onChange={handleChange} />
                <label>Email</label>
                <input type="email" name="email" onChange={handleChange} />
                <button>Save</button>
            </form>
        </div>
    )
}