import Geocode from "react-geocode";


export default function SetCoordinates(){

    Geocode.setApiKey("AIzaSyAHlmCaUPNsdfQELihym8-IttZSFNAWmnw")

    Geocode.fromAddress(address).then(
        (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            setLocation([lat, lng]);
        },
        (error) => {console.error(error)}
    );

    console.log("address: ", address)
    console.log('location: ', location)
}