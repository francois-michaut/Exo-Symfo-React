import React, { Component } from "react";

import '../styles/app.css';

class Modal extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="formAddUser">
                <h1>Formulaire d'ajout d'un utilisateur</h1>
                <form>
                    <label>
                        <span>Nom :</span>
                        <input type="text" name="name" />
                    </label>
                    <label>
                        <span>Prénom :</span>
                        <input type="text" name="firstname" />
                    </label>
                    <label>
                        <span>Email :</span>
                        <input type="text" name="email" />
                    </label>
                    <label>
                       <span> Adresse :</span>
                        <input type="text" name="adresse" />
                    </label>
                    <label>
                        <span>Téléphone :</span>
                        <input type="text" name="phone" />
                    </label>
                    <button className="form__button" type="submit" value="Envoyer">Envoyer</button>
                </form>
            </div>
        );
    }
}

export default Modal;