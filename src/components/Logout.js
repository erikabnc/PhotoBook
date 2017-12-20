import React, { Component } from 'react';
import firebase from 'firebase';

class Logout extends Component {
    constructor() {
      super()
      this.handleLogout = this.handleLogout.bind(this);
    }
  
    handleLogout(){
        firebase.auth().signOut()
    }

    render() {
        return (
                <button class="ui button" onClick={this.handleLogout}>Logout</button>
        )
    }
}
export default Logout