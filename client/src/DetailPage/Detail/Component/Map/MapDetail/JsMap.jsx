import React,{ useState, useCallback,useRef } from "react";
import GoogleMapReact from "google-map-react";
import styled from 'styled-components';
import "./MapDetail.scss";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import "./MapDetail.scss";

const JsMap = ({ data }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCOm1DE7ldfL8idgN5R8iTUKk1Rrt9_DUs" //process.env.NEXT_PUBLIC_GMAPS_API,
  });

  const markerCount = data.length;
  const sumLat = data.reduce((sum, marker) => sum + marker.latitude, 0);
  const sumLng = data.reduce((sum, marker) => sum + marker.longitude, 0);
  const centerLat = sumLat / markerCount;
  const centerLng = sumLng / markerCount;

  console.log(centerLat,centerLng)
  const center = {
      lat: centerLng,
      lng: centerLat
  }

  const [mapInstance, setMapInstance] = useState(null);


  const mapRef = useRef();

  // Google 맵 로드
  const onLoad = useCallback(function callback(map) {
    setMapInstance(map);
  }, []);
  const onUnmount = useCallback(function callback(map) {
    setMapInstance(null);
  }, []);

  return isLoaded ? (
    <Wrapper>
        <GoogleMap
          ref={mapRef}
          mapContainerStyle={{ width: "100%", height:300 }}
          zoom={15}
          center={center}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
        </GoogleMap>
    </Wrapper>
  ) : (
    <></>
  );
};

export default JsMap;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
`;