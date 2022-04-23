/* eslint-disable */

import React from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
/* global google */

Geocode.setApiKey("AIzaSyDKNJ1TI_zJnzqBEmMzjlpw3tUBdoCK66g");
Geocode.enableDebug();

class Map extends React.Component{
  constructor( props )  {
    super( props );
    this.state = {
      activeMarker: null,
      activeEvent: null
    }
  }

  /**
  * Get the current address from the default map position and set those values in the state
  */
 componentDidMount() {

  this.setState({
    farmList : this.props.farmList,
    city: this.props.city,
    mapPosition: this.props.mapPosition,
    markerPosition: this.props.markerPosition,
  });
};

  /**
  * And function for city,state and address input
  * @param event
  */
  onChange = ( event ) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  /**
  * This Event triggers when the marker window is closed
  *
  * @param event
  */
  onInfoWindowClose = ( event ) => {};

  handleChange = param => e => {
    this.props.handleMarkerClicked(param);
  };

render() {
  let farmList = this.props.farmList;
  var AsyncMap = withScriptjs(
    withGoogleMap(
    props => (
      <GoogleMap key={new Date().getTime()} google={this.props.google}
                defaultZoom={this.props.zoom}
                defaultCenter={{ lat: this.props.mapPosition.lat, lng: this.props.mapPosition.lng }}>
      </GoogleMap>
    )
   )
  );
let map;
  if( this.props.mapPosition.lat !== undefined ) {
    map = <div>
            <AsyncMap
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDKNJ1TI_zJnzqBEmMzjlpw3tUBdoCK66g&libraries=places"
              loadingElement={
              <div style={{ height: `100%` }} />
              }
              containerElement={
              <div style={{ height: this.props.height }} />
              }
              mapElement={
              <div style={{ height: `100%` }} />
              }
            />
            </div>
  } else {
    map = <div style={{height: this.props.height}} />
  }
    return( map )
  }
}
export default Map