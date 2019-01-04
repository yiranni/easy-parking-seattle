import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
    render() {
        return(
            <>
                <footer>Demi Tu / Yiran Ni / Leo Cai ©2018. All Rights Reserved.
                <br />Contact information: <a href="mailto:demigod@uw.edu">demigod@uw.edu</a> / <a href="mailto:yirann@uw.edu">yirann@uw.edu</a> / <a href="mailto:wx1994c@gmail.com">wxc1994@gmail.com</a>
                <br />Data From: <a href="https://gisdata.seattle.gov/server/rest/services/SDOT/SDOT_ParkingData/MapServer/2/query?where=1%3D1&outFields=*&outSR=4326&f=json">Seattle GIS Open Data</a>
                </footer>
            </>
        );
    };
};

export default Footer;