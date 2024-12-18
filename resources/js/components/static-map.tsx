import {
    MapContainer,
    TileLayer,
    Marker,
    Polyline,
    Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/marker-icon-2x.png",
    iconUrl: "/marker-icon.png",
    shadowUrl: "/marker-shadow.png",
});

interface StaticMapProps {
    from: {
        lat: number;
        lng: number;
    };
    to: {
        lat: number;
        lng: number;
    };
}

const StaticMap = ({ from, to }: StaticMapProps) => {
    const [routeCoordinates, setRouteCoordinates] = useState<
        [number, number][]
    >([]);

    useEffect(() => {
        const fetchRoute = async () => {
            try {
                const response = await fetch(
                    `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`
                );
                const data = await response.json();

                if (data.routes && data.routes[0]) {
                    const coordinates = data.routes[0].geometry.coordinates.map(
                        (coord: number[]) =>
                            [coord[1], coord[0]] as [number, number]
                    );
                    setRouteCoordinates(coordinates);
                }
            } catch (error) {
                console.error("Error fetching route:", error);
                setRouteCoordinates([
                    [from.lat, from.lng],
                    [to.lat, to.lng],
                ]);
            }
        };

        fetchRoute();
    }, [from, to]);

    const center: [number, number] = [
        (from.lat + to.lat) / 2,
        (from.lng + to.lng) / 2,
    ];

    return (
        <MapContainer
            center={center}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[from.lat, from.lng]}>
                <Popup>You are here</Popup>
            </Marker>
            <Marker position={[to.lat, to.lng]}>
                <Popup>Destination</Popup>
            </Marker>
            <Polyline positions={routeCoordinates} color="blue" />
        </MapContainer>
    );
};

export default StaticMap;
