import React, { Component } from 'react';
import firebase from 'firebase';

class Login extends Component {
    constructor() {
      super()
      this.handleAuth = this.handleAuth.bind(this)
    }
  
    handleAuth(){
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
    }

    render() {
        return ( 
                <button class="ui button" onClick={this.handleAuth}>Login</button>
           
        )
    }
}
export default Login