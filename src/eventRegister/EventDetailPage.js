/* eslint-disable */

import React, { Component } from 'react';
import './EventDetailPage.css';
import NavBar from '../navbar/NavBar.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Calendar from 'react-calendar'
import axios from 'axios';
import Geocode from "react-geocode";
import Script from 'react-load-script';

import Map from '../searchPage/map/Map.js';

Geocode.setApiKey("AIzaSyDKNJ1TI_zJnzqBEmMzjlpw3tUBdoCK66g");
Geocode.enableDebug();

class EventDetailPage extends Component {

    constructor(props) {
        super(props)

        console.log("HEREEE", this.props.location.state)
        this.state = {
   
            title: this.props.location.state.title,
            location: this.props.location.state.location,
            date: this.props.location.state.date,
            cost: this.props.location.state.cost,
            meal: this.props.location.state.meal,
            guest: this.props.location.state.guest,
            hostID:this.props.location.state.hostID,
            accessibility: this.props.location.state.accessibility, 
            attendees: this.props.location.state.attendees,
            description: this.props.location.state.description,
            allergies: this.props.location.state.allergies,
            additionalInfo: this.props.location.state.additionalInfo,
            id: this.props.location.state.id,
            farms: this.props.location.state.farms,
            loggedIn: false,
            user: {},
            hostName: "",
            access: "",
            value: 1,
        };
        this.viewProfile = this.viewProfile.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.renderFarms = this.renderFarms.bind(this)

    }
    componentDidMount() {
        axios.get('http://localhost:9000/isUserLoggedIn').then(res => {
            const loggedIn = res.data;
            this.setState({loggedIn});
        })
        //this does not currently acocunt for if the user logs in after the fact
        axios.get('http://localhost:9000/user/' + this.state.hostID).then(res => 
            this.setState({hostName: res.data.displayName, user:res.data}) 
        )

        if (this.state.accessibility) {
            this.setState({access: "Yes!"})
        } else {
            this.setState({access: "No"})
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    goToPayment() {
        this.props.history.push({
            pathname: '/checkout', 
            state: {  title: this.state.title,
             cost: this.state.cost, guest: this.state.guestNum, hostID: this.state.hostID,
             attendees: this.state.attendees, description:this.state.description, 
             id: this.state.id, meal: this.state.meal, date: this.state.date, 
             location: this.state.location, guest_num: this.state.value, hostName: this.state.hostName}          
          })
    }

    viewProfile() {
        this.props.history.push({
            pathname: '/profile-page',
            state: { user : this.state.user }       
        })
    }

    renderFarms() {
        let farms = this.state.farms;
        return <ul>
                {farms.map(farm => <li>{farm}</li>)}
            </ul>
    }
      
    render() {
        let farms = this.renderFarms();
        return (
            <div id="registerevent">
                <NavBar/>


            <div className="inner-container">
                <div className="detail-box">
                    <div className="modprice">
                        <label htmlFor="name">Cost: $ {this.state.cost} / seat</label> 
                    </div>
                    <div>
                        <ul className = "modseparate"></ul>
                    </div>
                    <div className="dateFormat">
                        <label htmlFor="name">Date</label> 
                        <p ></p>
                        <div
                        type="date"
                        className="number-of-guests">{this.state.date}</div>
                    </div>
                    <div className="moddetails">
                        <label htmlFor="name">Attendees</label>
                        <select id="guests" className="number-of-guests" value={this.state.value} onChange = {this.handleChange}> num value set at max event.guestNum?
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        {/* <input
                            type="number"
                            name="name"
                            defaultValue="1"
                            min="1"
                            max="40"
                            className="number-of-guests"></input>  */}
                    </div>
                
                    <button onClick={() => this.goToPayment() }
                        type="submit"  
                        className="reservebutton" disabled={!this.state.loggedIn}>Reserve</button>
            
                </div>
                <div className="myEvent">
                    <label htmlFor="name">{this.state.title} </label>  
                </div>    
                <div className="host" onClick={this.viewProfile}>
                    <img src="https://getdrawings.com/free-icon/google-account-icon-65.png"
                        className="acctimg"></img>
                    <label htmlFor="name">{this.state.user.displayName}</label>  
                </div>
                
                <div className="mealdescriptions">
                    <label htmlFor="name">{this.state.meal}</label>
                </div>
                <div>
                    <ul className = "detailseparate"></ul>
                </div>
                <div className="detailheaders">
                    <label htmlFor="name">Menu Overview</label> 
                </div>
                
                <div className="detaildescriptions">
                    <label htmlFor="name">{this.state.description}</label> 
                </div>
                <div>
                    <ul className = "detailseparate"></ul>
                </div>
                <div className="detailheaders">
                    <label htmlFor="name">Accessibility Accommodations?</label> 
                </div>
                
                <div className="detaildescriptions">
                    <label htmlFor="name">{this.state.access}</label>
                </div>
                <div>
                    <ul className = "detailseparate"></ul>
                </div>
                <div className="detailheaders">
                    <label htmlFor="name">Cancellation Policy</label>
                </div>
                
                <div className="detaildescriptions">
                    <label htmlFor="name">Free cancellations provided up to 48 hours before event. </label>
                </div>
                <div>
                    <ul className = "detailseparate"></ul>
                </div>
                <div className="detailheaders">
                    <label htmlFor="name">Additional Info</label>  
                </div>
                        <div className = "detaildescriptions"> <label htmlFor="name">{this.state.additionalInfo}</label>
                        Food source:
                        {farms}
                </div>
                <div>
                    <ul className = "detailseparate"></ul>
                </div>
                <div className="detailheaders">
                    <label htmlFor="name"></label>  {}
                </div>
                {/* <div class="mapouter"> */}
                    {/* <div class="gmap_canvas">
                        <iframe 
                        width="700" 
                        height="500" 
                        id="gmap_canvas" 
                        src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                        frameborder="0" 
                        scrolling="no" 
                        marginheight="0" 
                        marginwidth="0"
                        location= {this.state.location}
                        ></iframe>
                    </div> */}
                            <div className="detailheaders">
                    <label htmlFor="name">Location</label>  
                </div>
                <div className = "detaildescriptions"> <label htmlFor="name">{this.state.location.city}, {this.state.location.state} </label>
                </div>
                    {/* <div id="map-container">
          <Map
            google={this.state.google}
            mapPosition= {this.state.location}
            markerPosition= {this.state.location.geopoint}
            height='500px'
            zoom={12}
            selectedEvent={this.state.title}
          />
        </div> */}
                {/* </div> */}
                <div className="detaildescriptions">
                    <p>*Note the exact location of this event will not be available to guests until 48 hours before the meal</p>
                </div>
                
                
            </div>
            
            
            </div>
        );
    }
}

   export default EventDetailPage;