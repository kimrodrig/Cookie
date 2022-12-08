import React, { useState, useEffect } from "react";
import OlMap from "ol/map";
import View from "ol/view";
import TileLayer from "ol/layer/tile";
import VectorLayer from "ol/layer/vector";
import OlSourceOSM from "ol/source/osm";
import VectorSource from 'ol/source/vector';
import Icon from 'ol/style/icon'
import Style from 'ol/style/style'
import Feature from 'ol/feature';
import Point from 'ol/geom/point';

export default function ProfileMap({yourCoordinates, chefs}){

    const proj = (require('ol/proj')).default;
    const [center, setCenter] = useState([0,0])
    const [zoom, setZoom] = useState(14);

    useEffect(()=>{
        if (yourCoordinates) {
            const yourTransformedCoordinates = proj.fromLonLat(yourCoordinates);
            setCenter(yourTransformedCoordinates);
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


    useEffect(() => {
        let map = new OlMap({
            target: undefined,
            layers: [
                new TileLayer({
                    source: new OlSourceOSM()
                }),
                youAreHereVectorLayer
            ],
            view: new View({
            center: center,
            zoom: zoom
            })
        });
        map.setTarget('map')
        return () => map.setTarget(undefined);
    }, [center, chefs])
    

    return (
        <div>    
            <div id='map' class="map" 
            style={{ width: "100%", height: "300px" }}
            ></div>
        </div>
)

}