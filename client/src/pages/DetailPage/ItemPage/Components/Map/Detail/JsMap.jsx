import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import styled from "styled-components";
import "./MapDetail.scss";

const JsMap = ({ data }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCOm1DE7ldfL8idgN5R8iTUKk1Rrt9_DUs", //process.env.NEXT_PUBLIC_GMAPS_API,
  });

  const markerCount = data.length;
  const sumLat = data.reduce((sum, marker) => sum + marker.latitude, 0);
  const sumLng = data.reduce((sum, marker) => sum + marker.longitude, 0);
  const centerLat = sumLat / markerCount;
  const centerLng = sumLng / markerCount;

  const center = {
    lat: centerLat,
    lng: centerLng,
  };

  const [mapInstance, setMapInstance] = useState(null);

  // Google 맵 로드
  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    mapInstance?.fitBounds(bounds);
    setMapInstance(map);
  }, []);
  const onUnmount = useCallback(function callback(map) {
    setMapInstance(null);
  }, []);

  return isLoaded ? (
    <Wrapper>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: 300 }}
        zoom={15}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {data.map((marker) => {
          return (
            marker.latitude &&
            marker.longitude && (
              <MarkerF
                key={marker.title}
                position={{ lat: marker.latitude, lng: marker.longitude }}
                title={marker.title}
              />
            )
          );
        })}
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
