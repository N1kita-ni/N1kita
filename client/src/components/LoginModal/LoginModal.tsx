import * as React from 'react';
import * as Modal from 'react-modal';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import { ModalProps } from '@typings/modal';
import '@styles/LoginModal.css';

const LoginModal: React.SFC<any> = ({ isOpen, onRequestClose, setActiveModal, getUser }): JSX.Element => (
  <Modal
    className="login-modal"
    isOpen={isOpen}
    onRequestClose={onRequestClose}
  >
    <form className="form" action="/auth/login" method="POST" 
    onSubmit={(event) => { 
      event.preventDefault();
      localStorage.setItem("username",document.forms[0].username.value);
      localStorage.setItem("password",document.forms[0].password.value);
      getUser();
      onRequestClose();
  }}>
      <h1>Log In</h1>
      <TextField
        hintText="Enter Username"
        floatingLabelText="Username"
        name="username"
        autoFocus
      /><br />
      <TextField
        hintText="Enter Password"
        floatingLabelText="Password"
        name="password"
        type="password"
      /><br />
      <RaisedButton
        className="btn"
        label="Submit"
        primary={true}
        type="submit"
      />
      <p>Don't have an account yet? <a onClick={() => setActiveModal('register')}>Register here</a>.</p>
    </form>
  </Modal>
);

export default LoginModal;
