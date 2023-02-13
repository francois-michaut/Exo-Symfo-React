import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Users extends Component {
    constructor() {
        super();
        this.state = { users: []};
    }
    
    componentDidMount() {
        this.getUsers();
    }
    
    getUsers() {
       axios.get(`http://localhost:8000/api/users`).then(users => {
           this.setState({ users: users.data, loading: false})
       })
    }

    
     handleDeleteUser(evt) {
         let index = evt.target.value;
         console.log(index);
         axios.delete(`http://localhost:8000/api/deleteUser/${index}`)
               .then(response => { console.log(response)} )
     }


    render() {
        return (
            <div>
                <h1 className='users__title'>Page des Utilisateurs</h1>
                <table className="table table-striped home__table w-50">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Firstname</th>
                            <th scope="col">Email</th>
                            <th scope="col">Adresse</th>
                            <th scope="col">Téléphone</th>
                            <th scope="col">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16" >
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.users.map( user =>                          
                            <tr key={user.id}>
                                <td scope="row">{user.id}</td>
                                <td><Link className={"nav-link"} to={`/details/user/${user.id}`}>{user.name}</Link></td> 
                                <td>{user.firstname}</td>
                                <td>{user.email}</td>
                                <td>{user.adresse}</td>
                                <td>{user.telephone}</td>
                                <td><button type="button" value={user.id} onClick={this.handleDeleteUser}>
                                        Supprimer
                                    </button></td> 
                            </tr>
                        )}
                        
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Users;