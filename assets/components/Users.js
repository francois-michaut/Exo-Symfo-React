import React, {Component, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from './Modal';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [], isOpen: false};
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }
    
    componentDidMount() {
        this.getUsers();
    }

    useEffect() {
        console.log('composanrt mis à jour');
    }
    getUsers() {
       axios.get(`http://localhost:8000/api/users`).then(users => {
            console.log(users.data);
           this.setState({ users: users.data})
       })
    }

    
    

    
     handleDeleteUser(evt) {
        evt.preventDefault();
         let index = evt.target.value;
         axios.delete(`http://localhost:8000/api/deleteUser/${index}`)
               .then(response => {
                    this.setState({ users: response.data, loading: true})
                    this.getUsers();

                } )
     
     }

     toggleModal() {
        this.state.isOpen ? this.setState({isOpen: false}) : this.setState({isOpen: true});
        this.getUsers();
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
                            <th scope="col">Age</th>
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
                                <td>{user.age} ans</td>
                                <td><button type="button" value={user.id} onClick={this.handleDeleteUser}>
                                        Supprimer
                                    </button></td> 
                            </tr>
                        )}
                        
                    </tbody>
                </table>
                <div className='users__addUser'>
                    <button type='button' className='users__addUser--button btn btn-success' onClick={this.toggleModal} >
                        Ajouter un utilisateur
                    </button>
                    {this.state.isOpen && <Modal />}
                </div>
            </div>
        )
    }
}

export default Users;