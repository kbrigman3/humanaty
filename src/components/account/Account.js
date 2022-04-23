import React, {useState} from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './account.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

function Account(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => {
        setShow(false);
    }
    const handleCloseLogout = () => {
        setShow(false);
        axios.get('http://localhost:9000/logout').then((response) => {
            props.isLoggedOut();
            console.log(response.data);
        })
    }
    const handleShow = () => {
        setShow(true);
        //in handleShow we're setting the user's name, email, and status
        axios.get('http://localhost:9000/current').then(function(response) {
            //get user data object from backend
            setUser(response.data)
            setName(response.data.name)
            setEmail(response.data.email)
            if (response.data.hostVerified) {
                setMode("Host")
                setChecked(true)
                props.toggleHost(true);
            } else { //Setting checked status of toggle switch so its remembered on reload
                setMode("Guest")
                setChecked(false)
                props.toggleHost(false);
            }
        })
       
    }

    const handleModeChange = () => {
        axios.get('http://localhost:9000/current').then(function(response) {
            if (response.data.hostVerified) { //if host, change to guest
                axios.get('http://localhost:9000/changeStatus').then(function(response) {
                    console.log(response.data);
                })
                setMode("Guest")
                setChecked(false)
                props.toggleHost(false);
            } else {
                axios.get('http://localhost:9000/changeStatus').then(function(response) {
                    console.log(response.data);
                })
                setMode("Host") //vice versa
                setChecked(true)
                props.toggleHost(true);
            }
        })
    }

    const viewMyProfile = () => {
        setRedirect(true);
    }

    //hooks for setting the state of name, email, mode, and toggle switch
    const [showName, setName] = useState(true)
    const [showEmail, setEmail] = useState(true)
    const [showMode, setMode] = useState(true)
    const [checkedState, setChecked] = useState(true)
    const [user, setUser] = useState(true)
    const [shouldRedirect, setRedirect] = useState(false)

    if (shouldRedirect) {
        return <Redirect to={{
          pathname: '/profile-page',
          state: { user: user }
        }} />
      } else {
        return (
            <div>
                {/* Will replace placeholder with actual image fetched from database; in the future users will have an
                image url field that we will get image from */}
                <img id = "navbar-profile-pic" src={require('./placeholder.png')} alt="profile pic" width="30" height="30" onClick={handleShow}/>
                <Modal dialogClassName='custom-dialog' show = {show} onHide = {handleClose}>
                    <Modal.Header>
                        <div className-="modal-header-containter">
                            <div onClick={viewMyProfile}>
                                <img id="modal-profile-pic" src={user.photoURL} alt="profile pic" onClick={handleShow}/>
                            </div>
                            <div>signed in as {user.displayName}</div>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div class="col-sm" id = "basicInfo">
                        <p  id="accName">{showName}</p> 
                        <p id="accEmail">{showEmail}</p>
                        <p id="btn-profile" onClick={viewMyProfile}>My Profile</p>
                        </div>
    
                        <div class = "col-sm" id = "toggleMode">
                            <div class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input" id="customSwitches" checked = {checkedState}></input>
                                <label class="custom-control-label" for="customSwitches" onClick = {handleModeChange}>{showMode}</label>
                            </div>
                        </div>
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                        Settings
                        </Button>
                        <Button variant="primary" onClick={handleCloseLogout}>
                        Log Out
                        </Button>
                    </Modal.Footer>
                </Modal>
    
            </div>
        )
      }
    
}

export default Account;