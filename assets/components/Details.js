import React, {Component} from 'react';
import axios from 'axios';

class Details extends Component {
    constructor() {
        super();
        this.state = { user: null, index: (window.location.pathname).slice(14)};
    }
   

    componentDidMount() {
        this.getUser();
    }
    
    getUser(){
        axios.get(`http://localhost:8000/api/user/detail/${this.state.index}`)
            .then(user => {
                console.log(user.data);
                this.setState({user: user.data});
            })
    }

        render() {
        console.log(this.state.index);

            return (
                <div>
                    <h1 className='detail__title'>Détail de l'utilisateur : {this.state.user && this.state.user.firstname} {this.state.user && this.state.user.name} </h1>
                    {this.state.user && 
                        <div>
                            <h2 className='detail__subtitle'> Voici sa fiche de renseignements: </h2>
                            <div className='detail__card'>
                                <h3>Nom: {this.state.user.name}</h3>
                                <h4>Prénom: {this.state.user.firstname}</h4>
                                <h4>Adresse mail: {this.state.user.email}</h4>
                                <h4>Adresse postale: {this.state.user.adresse}</h4>
                                <h4>Et voici ses possessions: </h4>
                                <ul>
                                    {this.state.user.possessions.map(possession => 
                                        <li key={possession.nom}> Un(e) {possession.nom} qui a une valeur de {possession.valeur}€</li>
                                    )}

                                </ul>
                            </div>
                        </div>
                    }
                </div>
            );

        }
     }


export default Details;