import GoogleMapReact from "google-map-react";
import "./MapDetail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { MapDataProps } from "../../../../../Interfaces/PropsInterfaces";
import { MarkerProps } from "../../../../../Interfaces/PropsInterfaces";

const Marker = ({ lat, lng, title }: MarkerProps) => (
  <div className="Marker">
    <div className="marker-content">
      <div className="title">{title}</div>
      <FontAwesomeIcon className="icon-location" icon={faLocationDot} />
    </div>
  </div>
);

function MapDetail({ data }: MapDataProps) {
  const hasInvalidCoordinates = data.some((marker) => marker.latitude === null || marker.longitude === null);

  if (hasInvalidCoordinates) {
    return null;
  }

  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY_MAP;

  const markerCount = data.length;
  const sumLat = data.reduce((sum, marker) => sum + marker.latitude!, 0);
  const sumLng = data.reduce((sum, marker) => sum + marker.longitude!, 0);
  const centerLat = sumLat / markerCount;
  const centerLng = sumLng / markerCount;

  return (
    <div className="MapDetail">
      <div className="google-map">
        {/* <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY || "" }}
          defaultCenter={{ lat: centerLat, lng: centerLng }}
          defaultZoom={15}
        >
          {data.map(
            (marker) =>
              marker.latitude &&
              marker.longitude && (
                <Marker key={marker.title} lat={marker.latitude!} lng={marker.longitude!} title={marker.title} />
              )
          )}
        </GoogleMapReact> */}
      </div>
    </div>
  );
}

export default MapDetail;
