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
import Overlay from 'ol/overlay';

// import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';

function MapFn({yourCoordinates, chefs, setSelectedChefId}){

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

    function newChefMarkerLayer(location, id, name, rating, cuisines){
        const iconFeature = new Feature({
            geometry: new Point(proj.fromLonLat(location)),
            id: id,
            name: name,
            rating: rating,
            cuisines: cuisines
        });
        const iconStyle = new Style({
            image: new Icon({
                anchor: [0.5, 1],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                src: "https://icons.iconarchive.com/icons/fatcow/farm-fresh/32/chefs-hat-icon.png",
            }),
        });
        iconFeature.setStyle(iconStyle);
        const vectorSource = new VectorSource({
            features: [iconFeature],
        });
        const vectorLayer = new VectorLayer({
            source: vectorSource
        });
        return vectorLayer;
    }

    
    const overlay = new Overlay({
        // element: container,
        autoPan: {
            animation: {
                duration: 250,
            },
        },
    });

    useEffect(() => {
        let map = new OlMap({
            target: undefined,
            layers: [
                new TileLayer({
                    source: new OlSourceOSM()
                })
            ],
            overlays: [overlay],
            view: new View({
            center: center,
            zoom: zoom
            })
        });
        for (const chef of chefs){
            map.addLayer(newChefMarkerLayer(chef.location, chef.id, chef.name, chef.avg_rating, chef.cuisines))

        }
        //top layer is your own location
        map.addLayer(youAreHereVectorLayer)

        map.on('click', function (evt) {
            const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
                return feature
            });
            if (feature) {
                const coordinates = feature.getGeometry().getCoordinates();
                setSelectedChefId(feature.get('id'))
                //change hat
            } else {
                setSelectedChefId(0)
                //change hat back
            }
        });

        map.setTarget('map')
        return () => map.setTarget(undefined);
        }, [center, chefs]);
    
    return (
        <div>    
            <div id='map' class="map" 
            style={{ width: "100%", height: "400px" }}
            ></div>
        </div>
    )
    
}

export default MapFn;