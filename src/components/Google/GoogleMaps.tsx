import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';


const containerStyle: React.CSSProperties = {
  height: '400px',
  display: 'flex',
  maxWidth: '100%',
  padding:'0px'
};

interface iData {
  lat: number | undefined,
  lng: number | undefined
};


export default function MapComponent(props:any){
    return (
      <LoadScript
        googleMapsApiKey="AIzaSyD4ZQyi41_wlT6SY_ozGTTdmktyt08wj-o"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={props}
          zoom={20}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
      </LoadScript>
    )
}