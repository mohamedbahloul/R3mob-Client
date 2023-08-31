import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import styled from "styled-components";
import universityIconUrl from "../assets/Université.png";

const Div = styled.div`
  margin-bottom: 10%;
`;
// Create a custom icon
const universityIcon = L.icon({
  iconUrl: universityIconUrl, // Path to your custom icon image
  iconSize: [32, 32], // Icon size [width, height]
  iconAnchor: [16, 32], // Anchor point of the icon [x, y]
  popupAnchor: [0, -32], // Anchor point for the popup relative to the icon [x, y]
});

function BordeauxMap() {
  useEffect(() => {
    const mapCenter = [44.7987897, -0.6154092];
    const map = L.map("map", {
      center: mapCenter,
      zoom: 6,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);



    const markerCoordinates = [
      {
        coord: [48.97155581127591, 2.5941110032210695],
        label: "Université Gustave Eiffel",
      },
      {
        coord: [46.14913385444316, -1.155439299099722],
        label: "Université de La Rochelle",
      },
      {
        coord : [45.82507391081293, 1.259882441672819],
        label: "Université de Limoges",
      },
      {
        coord : [46.58631380675584, 0.34210733021681394],
        label: "Université de Poitiers",
      },
      {
      coord : [44.795702814912474, -0.6164211819528165],
        label: "Université de Bordeaux Montaigne",
      }, {
        coord : [44.82516036465213, -0.6060986192125665],
        label: "Université de Bordeaux",
      },
      {
        coord : [43.313532512523004, -0.36507176023496246],
        label: "Université de Pau et des Pays de l'Adour",
      }

    ];

    markerCoordinates.forEach((coords) => {
      L.marker(coords.coord, { icon: universityIcon })
        .addTo(map)
        .bindPopup(coords.label)
        .openPopup();
    });

    return () => {
      map.remove();
    };
  }, []);

  return <Div id="map" style={{ height: "700px" }}></Div>;
}

export default BordeauxMap;
