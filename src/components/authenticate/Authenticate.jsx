import React, { Component } from 'react';
import Login from '../login/Login';
import SignUp from '../signup/SignUp';

class Authenticate extends Component {
    constructor(props) {
        super(props);
        this.state ={
            component:'signup'
        }
        this.showLogin = this.showLogin.bind(this);
        this.showSignUp = this.showSignUp.bind(this);
    };

    showSignUp(){
        this.setState({
            component:'signup'
        })
    }

    showLogin(){
        this.setState({
            component:'login'
        })
    }
    render() {
        const {
            component
        } = this.state
        return (
            <section className="container">
            {
                component == 'signup' ? 
                <SignUp showLogin={this.showLogin} /> :
                <Login showSignUp={this.showSignUp} />
            }
            <div id="col-2">
              <img src={require('../../assets/imgs/scraper22.png')} alt="scrap2per" />
              <span id="firstH">ScrapperZilla</span>
              <span id="secondH">Scrap the shit out of any site</span>
            </div>
          </section>
        );
    }
}

export default Authenticate
