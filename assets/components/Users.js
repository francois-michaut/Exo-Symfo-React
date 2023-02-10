import React, {Component} from 'react';
import axios from 'axios';

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
            console.log(users.data);
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
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.users.map( user => 
                            <tr key={user.id}>
                                <td scope="row">{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.firstname}</td>
                                <td>@{user.email}</td>
                            </tr>

                            )}
                       
                        
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Users;