import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Users extends Component {
    constructor() {
        super();
        this.state = { users: [], loading: true};
    }
    
    componentDidMount() {
        this.getUsers();
    }
    
    getUsers() {
       axios.get(`http://localhost:8000/api/users`).then(users => {
           this.setState({ users: users.data, loading: false})
       })
    }
    render() {
        return (
            <div>
                <h1 className='users__title'>Page des Users</h1>
                <table className="table table-striped home__table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Firstname</th>
                        <th scope="col">Email</th>
                        <th scope="col">Adresse</th>
                        <th scope="col">Téléphone</th>
                        <th scope="col">Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.users.map( user => 
                            <tr key={user.id}>
                                <td scope="row">{user.id}</td>
                                <td><Link className={"nav-link"} to={`/details/${user.id}`}>{user.name}</Link></td>
                                <td>{user.firstname}</td>
                                <td>{user.email}</td>
                                <td>{user.adresse}</td>
                                <td>{user.telephone}</td>
                                <td><button type="submit">X</button></td>
                            </tr>

                            )}
                       
                        
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Users;