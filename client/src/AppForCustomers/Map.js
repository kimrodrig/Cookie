import React, { Component } from "react";
import OlMap from "ol/map";
import OlView from "ol/view";
import OlLayerTile from "ol/layer/tile";
import OlSourceOSM from "ol/source/osm";


class Map extends Component {

    constructor(props) {
        super(props);

        console.log(this.props.yourCoordinates)

        const proj = (require('ol/proj')).default;
        const posNYC = proj.fromLonLat([-73.979681, 40.6974881]);

        this.state = { center: posNYC, zoom: 10 };

        this.olmap = new OlMap({
        target: null,
        layers: [
            new OlLayerTile({
            source: new OlSourceOSM()
            })
        ],
        view: new OlView({
            center: this.state.center,
            zoom: this.state.zoom,
            // projection: "EPSG 3857 "
        })
        });
    }

    updateMap() {
        this.olmap.getView().setCenter(this.state.center);
        this.olmap.getView().setZoom(this.state.zoom);
    }

    componentDidMount() {
        this.olmap.setTarget("map");

        // Listen to map changes
        this.olmap.on("moveend", () => {
        let center = this.olmap.getView().getCenter();
        let zoom = this.olmap.getView().getZoom();
        this.setState({ center, zoom });
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        let center = this.olmap.getView().getCenter();
        let zoom = this.olmap.getView().getZoom();
        if (center === nextState.center && zoom === nextState.zoom) return false;
        return true;
    }

    userAction() {
        this.setState({ center: [546000, 6868000], zoom: 5 });
    }

    render() {
        this.updateMap(); // Update map on render?
        return (
        <div id="map" style={{ width: "100%", height: "360px" }}>
        </div>
        );
    }
    }

export default Map;
