/* eslint-disable */


import React, {Component} from 'react';
import {Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';
import NavBar from '../navbar/NavBar.js';
import './CheckoutPage.css';

import axios from 'axios';
import EventDetailPage from '../eventRegister/EventDetailPage';
import { registerVersion } from 'firebase';

const stripePromise = loadStripe('pk_test_KsSBLHsah3N55vJsAQ7a8YDO00qx7rn3an');

class CheckoutPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.location.state.title,
            date: this.props.location.state.date,
            location: this.props.location.state.location,
            cost: this.props.location.state.cost,
            guest: this.props.location.state.cost,
            hostID: this.props.location.state.hostID,
            attendees: [this.props.location.state.attendees],
            description: this.props.location.state.description,
            id: this.props.location.state.id,
            meal: this.props.location.state.meal,
            guest_num: this.props.location.state.guest_num,
            full_name: '',
            hostName: this.props.location.state.hostName,
            address: '',
            city: '',
            state: '',
            zip: '',
            userId: ''
        }

        console.log(this.props);
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }
    componentDidMount() {
        axios.get('http://localhost:9000/current').then(res => {

        this.setState({userId: res.data.id}); 
  
      }

    )
    this.setState({attendees: this.state.attendees.concat(this.state.userId)});

    }


    render() {
        return (
            <div id="registerevent">
                <NavBar/>
                <div className="event">
                    <div className="summarybox">
                        <label htmlFor="name" className="reservationHeader">Reservation Summary</label>
                        <div>
                            <ul className = "modseparate"></ul>
                            {/* This will be replaced with a photo of the meal if we decide to implement that, otherwise this is just for visual separation */}
                        </div>
                        <div className="summaryboxdetails">
                            <label className="summaryboxdetails">{this.state.meal} with {this.state.hostName}</label>
                        </div>
                        <div className="reservationHeader">
                            <label className="reservationHeader">{this.state.title}</label>
                        </div>
                        <div className="summaryboxdetails">
                            <label className="summaryboxdetails">{this.state.location.city}, {this.state.location.state}</label>
                        </div>
                        <div>
                            <ul className = "modseparate"></ul>
                        </div>
                        <div>
                            <img src="https://www.iconsdb.com/icons/preview/green/calendar-10-xxl.png" className="dateimg"></img>
                            <label className="date1">{this.state.date}</label>
                        </div>
                        <div>
                            <ul className = "modseparate"></ul>
                        </div>
                        <div className="guestdetails1">
                            <label className="guestdetails1">{this.state.guest_num} guests </label>
                            <label className="guestdetails2"> x ${this.state.cost}</label>
                            <label className="total1">${this.state.cost * this.state.guest_num}</label>
                        </div>
                        <div>
                            <ul className = "modseparate"></ul>
                        </div>
                        <div className="total2">
                            <label className="total2">Total</label>
                            <label className="total3">${this.state.cost * this.state.guest_num}</label>
                        </div>
                    </div>
                    <img src="https://images.vexels.com/media/users/3/157931/isolated/preview/604a0cadf94914c7ee6c6e552e9b4487-curved-check-mark-circle-icon-by-vexels.png" className="cancellation1"></img>
                    <label className="cancellation2">Free cancellation up to 48 hours before event. </label>
                    <label htmlFor="name">Billing Information</label>
                    <div className="sectionheader">
                        <span className="numberCircle"><span>1</span></span>
                        <label htmlFor="name">Billing Address</label>
                        <div className="inputheader">
                            <label htmlFor="name">Full Name</label>
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                name="full_name"
                                className="name-address-input"
                                class="form-control"
                                value={this.state.full_name}
                                onChange={this.handleChange}/>
                        </div>
                        <div className="inputheader">
                            <label htmlFor="name">Street Address</label>
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                name="address"
                                className="name-address-input"
                                class="form-control"
                                value={this.state.address}
                                onChange={this.handleChange}/>
                        </div>
                        <div id="block-container">
                            <div id="bloc1">
                            <div className="inputheader">
                                <label htmlFor="name">City</label>
                            </div>
                            <div className="input-box">
                                <input
                                    type="text"
                                    name="city"
                                    className="city-state-input"
                                    class="form-control"
                                    value={this.state.city}
                                    onChange={this.handleChange}/>
                            </div>
                            </div>
                            <div id="bloc2">
                            <div className="inputheader">
                                <label htmlFor="name">State</label>
                            </div>
                            <div className="input-box">
                                <input
                                    type="text"
                                    name="state"
                                    className="city-state-input"
                                    class="form-control"
                                    value={this.state.state}
                                    onChange={this.handleChange}/>
                            </div>
                            </div>
                        </div>
                        <div className="inputheader">
                            <label htmlFor="name">Postal Code</label>
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                name="zip"
                                className="zip-input"
                                class="form-control"
                                value={this.state.zip}
                                onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="sectionheader">
                        <span className="numberCircle"><span>2</span></span>
                        <label htmlFor="name">Payment Details</label>
                        <div className="inputheader">
                        <Elements stripe={stripePromise}>
                            <ElementsConsumer>
                                {({stripe, elements}) => (
                                    <CheckoutForm stripe={stripe} elements={elements} 
                                    guest_num={parseInt(this.state.guest_num)} cost={this.state.cost}
                                 eventId={this.state.id}history={this.props.history} attendees={this.state.attendees}/>
                                 )}
                            </ElementsConsumer>
                        </Elements>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CheckoutPage;