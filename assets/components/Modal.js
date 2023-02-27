import axios from "axios";
import React, { Component } from "react";

import '../styles/app.css';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {name:'', firstname:'', email:'', adresse:'', phone:'', birthdate: '', isOpen: true};

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeAdresse = this.handleChangeAdresse.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeBirthdate = this.handleChangeBirthdate.bind(this);


        this.handleSubmit = this.handleSubmit.bind(this);
    }

   
   
    handleChangeName(event){
        this.setState({name: event.target.value});
    }

    handleChangeFirstname(event) {
        this.setState({firstname: event.target.value});
    }

    handleChangeEmail(event) {
        this.setState({email: event.target.value});
    }

    handleChangeAdresse(event) {
        this.setState({adresse: event.target.value});
    }

    handleChangePhone(event) {
        this.setState({phone: event.target.value});
    }

    handleChangeBirthdate(event) {
        console.log(event.target.value);
        this.setState({birthdate: event.target.value});
      
    }
    handleSubmit(evt) {
        evt.preventDefault();
      
        axios.post(`http://localhost:8000/api/addUser`,
                    JSON.stringify(
                        {"name": this.state.name,
                        "firstname": this.state.firstname,
                        "email": this.state.email,
                        "adresse": this.state.adresse,
                        "telephone": this.state.phone,
                        "birthDate": this.state.birthdate
                    }))
        .then((response) => {console.log(response.data)});
        this.setState({isOpen: false});
    }

    render() {
        return (
            <div>
                {this.state.isOpen &&
                <div className="formAddUser">
                    <h1>Formulaire d'ajout d'un utilisateur</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <span>Nom :</span>
                            <input type="text" name="name" value={this.state.name} onChange={this.handleChangeName} />
                        </label>
                        <label>
                            <span>Prénom :</span>
                            <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChangeFirstname} />
                        </label>
                        <label>
                            <span>Email :</span>
                            <input type="text" name="email" value={this.state.email} onChange={this.handleChangeEmail} />
                        </label>
                        <label>
                        <span> Adresse :</span>
                            <input type="text" name="adresse" value={this.state.adresse} onChange={this.handleChangeAdresse} />
                        </label>
                        <label>
                            <span>Téléphone :</span>
                            <input type="text" name="phone" value={this.state.phone} onChange={this.handleChangePhone} />
                        </label>
                        <label>
                            <span>Date de naissance :</span>
                            <input type="date" name="birthdate" value={this.state.birthdate} onChange={this.handleChangeBirthdate} />
                        </label>
                        <button className="form__button" type="submit" value="Envoyer">Envoyer</button>
                    </form>
                </div>}

            </div>
        );
    }
}

export default Modal;