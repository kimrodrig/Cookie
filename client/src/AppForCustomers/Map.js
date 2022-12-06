import React, { useState, useEffect } from "react";


export default function Map({yourCoordinates, chefs}){

    const proj = (require('ol/proj')).default;
    const [center, setCenter] = useState([0,0])
    const [zoom, setZoom] = useState(11);

    useEffect(()=>{
        if (yourCoordinates) {
            const posNYC = proj.fromLonLat(yourCoordinates);
            setCenter(posNYC);
        }
    },[yourCoordinates])

    const iconFeature = new Feature({
        geometry: new Point(center),
        name: 'Your Location'
    });
    const iconStyle = new Style({
        image: new Icon({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: "https://ucarecdn.com/4b516de9-d43d-4b75-9f0f-ab0916bd85eb/marker.png",
        }),
    });
    iconFeature.setStyle(iconStyle);
    const youAreHereVectorSource = new VectorSource({
    features: [iconFeature],
    });
    const youAreHereVectorLayer = new VectorLayer({
    source: youAreHereVectorSource,
    });

    //set center
    useEffect(()=>{
        if (yourCoordinates) {
            const yourPos = proj.fromLonLat(yourCoordinates);
            setCenter(yourPos);
        }
    },[yourCoordinates])
}