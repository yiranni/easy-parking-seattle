import React, { Component } from 'react';
import 'whatwg-fetch';
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import CusPin from './CusPin';
import PopupText from './PopupText';
import Geocoder from 'react-map-gl-geocoder';
import './Maps.css';

class Maps extends Component {
    constructor(props) {
        super(props);
        
        // Set initial state
        this.state = {
            viewport: {
                width: "90vw",
                height: "100vh",
                latitude: 47.6062,
                longitude: -122.3321,
                zoom: 13
            },
            data: [],
            result: null,
            popupInfo: null
        };
    }

    mapRef = React.createRef();

    resize = () => {
        this.handleViewportChange({
            width: "90vw",
            height: "100vh"
        });
    };

    handleViewportChange = viewport => {
        this.setState({
            viewport: { ...this.state.viewport, ...viewport }
        });
    };

    componentDidMount() {
        window.addEventListener("resize", this.resize);
        this.resize();
        
        // Load data
        fetch('https://gisdata.seattle.gov/server/rest/services/SDOT/SDOT_ParkingData/MapServer/2/query?where=1%3D1&outFields=*&outSR=4326&f=json')
        .then(response => {
            return response.json();
        }).then(data => {
            this.setState({
                data: data.features
            });
        }).catch(error => {
            console.error(error);
        });
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
        let radlat1 = Math.PI * lat1 / 180;
        let radlat2 = Math.PI * lat2 / 180;
        let theta = lon1 - lon2;
        let radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        return dist;
    }
    
    getPopup() {
        let displayName = this.props.user === null ? "" : this.props.user.displayName;
        if (this.state.popupInfo !== null) {
            return (
                <Popup tipSize={5}
                    anchor="top"
                    longitude={this.state.popupInfo.geometry.x}
                    latitude={this.state.popupInfo.geometry.y}
                    closeOnClick={false}
                    onClose={() => this.setState({popupInfo: null})} >
                    <PopupText info={this.state.popupInfo} user={displayName} />
                </Popup>
            );
        }
    }

    getMarker = (d, i)  => {
        if (this.state.result !== null) {
            let distance = this.calculateDistance(this.state.result.center[1], this.state.result.center[0], d.geometry.y, d.geometry.x);
            if (distance <= 0.3) {
                return (
                    <Marker
                        key={`marker-${i}`}
                        longitude={d.geometry.x}
                        latitude={d.geometry.y} >
                        <CusPin size={20} onClick={() => this.setState({popupInfo: d})} />
                    </Marker>
                );
            }
        }
    }

    render() {
        return(
            <div className="container" style={{position: 'relative', paddingTop: '50px'}}>
                <ReactMapGL
                    ref={this.mapRef}
                    {...this.state.viewport}
                    style={{margin: '2rem auto'}}
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                    onViewportChange={this.handleViewportChange}
                    mapboxApiAccessToken={'pk.eyJ1IjoiZGVtaWdvZC10dSIsImEiOiJjam80dXplamwwM3ZyM3FuMG11aWJnbzl0In0.0U2ER5dreRX2sGB9VvMv7w'}
                >
                    <Geocoder
                        mapRef={this.mapRef}
                        onViewportChange={this.handleViewportChange}
                        mapboxApiAccessToken={'pk.eyJ1IjoiZGVtaWdvZC10dSIsImEiOiJjam80dXplamwwM3ZyM3FuMG11aWJnbzl0In0.0U2ER5dreRX2sGB9VvMv7w'}
                        onResult={(result) => {
                            this.setState({
                                result: result.result,
                                popupInfo: null
                            });
                        }}
                    />
                    {this.state.data.map(this.getMarker)}
                    {this.getPopup()}
                    <div className="navigation-control" style={{position: 'absolute', top: 0, left: 0, padding: '10px'}}>
                        <NavigationControl onViewportChange={this.handleViewportChange} />
                    </div>
                </ReactMapGL>
            </div>
        );
    };
}

export default Maps;