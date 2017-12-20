import React, { Component } from 'react';
import Login from './Login';
import Logout from './Logout';

class Header extends Component {

    render () {
        return(
            <div>
            <div class="ui hidden divider">
            </div>
                <h1 class="ui center aligned header"> PhotoBook</h1>
                <div class="ui menu" >
                    <div class="item">
                        <Login/>
                    </div>
                    <div class="item">
                        <Logout/>
                    </div>
              </div>
            </div>
        )
    }
}

export default Header;