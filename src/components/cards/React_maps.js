import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

const mapStyles = {
  width: "500px",
  height: "400px",
  minHeight: "200px",
  maxHeight: "400px",
  marginTop: "2%",
};



export class MapContainer extends Component {
  state = {
    showingInfoWindow: true, // Hides or shows the InfoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: {}, // Shows the InfoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={6}
        style={mapStyles}
        initialCenter={{
          lat: 34.3437,
          lng: 8.56776,

         
        }}
      >
          
        {this.props.List_adress.map((marker) => {
          return (
            <Marker
              position={{ lat: marker.latitude, lng: marker.longitude }}
              onClick={this.onMarkerClick}
              name={marker.name}
            >
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
              >
                <div>
                  <h4>{this.state.selectedPlace.name}</h4>
                </div>
              </InfoWindow>
            </Marker>
          );
        })}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCxPYekaaYGz2xaaygN9iL91sxaLtsbCG0",
})(MapContainer);
