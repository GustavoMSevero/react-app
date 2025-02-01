import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';

export default function ListUsers() {

    const [users, setUsers] = useState([]);

    useEffect(()=> {
        getUsers();
    }, [])
    
    function getUsers(){
        axios.get("php/api.php", {
            params: {
                option: "get users",
              }
        }).then(function(response) {
            setUsers(response.data);
        });
    }

    function deleteUser(id) {
        axios.delete("php/api.php", {
            params: {
                id: id,
                option: "delete user",
              }
        }).then(function(response) {
            getUsers();
        }).catch(function (error) {
        });
    }

    return(
        <div>
            <h1>List Users</h1>

            <div className="table">
            <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {users.map((user, key) =>
                <tr key={key}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <Link to={`user/${user.id}/edit`}>Edit</Link>
                    </td>
                    <td>
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </td>
                </tr>
                )}
            </tbody>
            </Table>
            </div>
        </div>
    )
}