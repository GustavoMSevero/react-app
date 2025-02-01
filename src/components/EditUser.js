import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

export default function EditUser() {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const {id} = useParams();

    useEffect(()=> {
        getUser();
    }, [])

    function getUser() {
        axios.get("php/api.php", {
            params: {
                id: id,
                option: "get user"
              }
        }).then(function (response) {
            console.log(response.data)
            setInputs(response.data);
        })
          .catch(function (error) {
            console.log(error);
        });
    }

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    function handleSubmit(event) {
        event.preventDefault();
        inputs.option = "update user";
        axios.put("php/api.php", inputs).then(function(response) {
            navigate("/");
        })
    }

    return(
        <div>
            <h1>Edit User</h1>

            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input value={inputs.name} type="text" name="name" onChange={handleChange} />
                <label>Email</label>
                <input value={inputs.email} type="email" name="email" onChange={handleChange} />
                <button>Update</button>
            </form>
        </div>
    )
}