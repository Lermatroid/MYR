import React, { Component } from 'react';
import firebase from '../firebase.js'
// import 'firebase/firestore'
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

class Header extends Component {
  constructor() {
    super();
    this.state = {
      account: null
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged((account) => {
      if (account) {
        this.setState({ account });
        console.log(account);
      }
    });
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({
        account: null
      });
    });
  }
  login() {
    auth.signInWithPopup(provider).then((result) => {
      const account = result.account;
      this.setState({
        account
      });
      if (this.state.account) {
        console.log(this.state.account.uid)
      }
    });
  }
  render() {
    let loginBtn = null
    if (this.state.account == null) {
      loginBtn =
        <div>
          <p id='welcome-name' >Login to Save Your Progress</p>
          <RaisedButton
            label="Login"
            secondary={true}
            onClick={this.login}
            style={{ float: 'right' }}
          />
        </div>
    } else {
      loginBtn =
        <div>
          <Avatar src={this.state.account.photoURL} />
          <p id='welcome-name' >Welcome, {this.state.account.displayName}</p>
          <RaisedButton
            label="Logout"
            secondary={true}
            onClick={this.logout}
            style={{ float: 'right', marginLeft: 5 }}
          />
        </div>
    }
    return (
      <header className="App-header">
        <h1>MYR</h1>
        {loginBtn}
      </header>
    );
  }
}

export default Header