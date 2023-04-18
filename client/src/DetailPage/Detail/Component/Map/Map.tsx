import React from 'react';
import GoogleMapReact from 'google-map-react';
import './Map.scss';

function Map(props: any) {
  return (
    <div className='Map'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY || "" }}
        defaultCenter={{ lat: 37.5994, lng: 126.8653 }}
        defaultZoom={16}
      >
      </GoogleMapReact>
    </div>
  );
}

export default Map;
