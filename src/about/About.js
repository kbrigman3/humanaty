import React, { Component } from 'react';
import Script from 'react-load-script';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './About.css';
class About extends Component {
  
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
    };
  }

  render() {
    return (
      <div id="about">
        <section id="contact">
          <div class="container">
            <div class="row">
              <div class="col-lg-8 mx-auto">
               
                <h2><img src = {require('./logo.svg')} class = "logo"></img>About Us</h2>
                <p class="lead">huMANAty connects communities to the Farm-to-Table ecosystem to improve farm
                sustainability, drive social impact, economic development and entrepreneurship, and build a more 
                humane world.</p>
                <p class="second">Transforming the future for foodies, providing positive growth for local farmers, connecting
                people and cultures around the world through one common ground, huMANAty is about savoring one fork, meal, 
                conversation, and shared experience at a time.</p>
              </div>
            </div>
          </div>
          <div class = "wckContainer">
            <div class = "row">
              <div class = "col-lg-8 mx-auto">
                    <img src = {require('./wck.svg')} class = "wck"></img>
                    <p class = "wckText">Proud Sponsor of the World Central Kitchen</p>
                  
              </div>
            </div>
          </div>
          
        </section>
      </div>
      
    );
  }
}

export default About;