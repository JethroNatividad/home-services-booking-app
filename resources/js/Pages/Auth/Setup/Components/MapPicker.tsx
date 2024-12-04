/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useState, useEffect, useCallback, useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/marker-icon-2x.png",
    iconUrl: "/marker-icon.png",
    shadowUrl: "/marker-shadow.png",
});

interface MapPickerProps {
    setLocation: (location: {
        address: string;
        lat: number;
        lng: number;
    }) => void;
}

const MapPicker = ({ setLocation }: MapPickerProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [position, setPosition] = useState<[number, number]>([
        6.904691, 122.076462,
    ]);

    interface SearchResult {
        lat: string;
        lon: string;
    }

    const fetchAddress = async (lat: number, lon: number) => {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
            );
            if (response.data && response.data.display_name) {
                return response.data.display_name;
            } else {
                return "Address not found";
            }
        } catch (error) {
            console.error("Error fetching address:", error);
            return "Error fetching address";
        }
    };

    const handleSearch = useCallback(async () => {
        try {
            const response = await axios.get<SearchResult[]>(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    searchQuery
                )}`
            );
            if (response.data && response.data.length > 0 && response.data[0]) {
                const { lat, lon } = response.data[0];
                const address = await fetchAddress(
                    parseFloat(lat),
                    parseFloat(lon)
                );
                setSearchQuery(address);
                setPosition([parseFloat(lat), parseFloat(lon)]);
                setLocation({
                    address,
                    lat: parseFloat(lat),
                    lng: parseFloat(lon),
                });
            } else {
                alert("Location not found");
            }
        } catch (error) {
            console.error("Error searching for location:", error);
            alert("Error searching for location");
        }
    }, [searchQuery, setLocation]);

    const MapEvents = useMemo(() => {
        const Component = () => {
            const map = useMap();
            useEffect(() => {
                map.flyTo(position, map.getZoom());
            }, [position]);

            useEffect(() => {
                const handleClick = async (e: L.LeafletMouseEvent) => {
                    const lat = e.latlng.lat;
                    const lon = e.latlng.lng;
                    const address = await fetchAddress(lat, lon);
                    setPosition([lat, lon]);
                    setSearchQuery(address);
                    setLocation({ address, lat, lng: lon });
                };

                map.on("click", handleClick);
                return () => {
                    map.off("click", handleClick);
                };
            }, [map]);

            return null;
        };
        return Component;
    }, [position, setLocation]);

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for a location"
                />
                <Button type="button" onClick={handleSearch}>
                    <Search />
                </Button>
            </div>
            <MapContainer
                center={position}
                zoom={13}
                style={{ height: "400px", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position} />
                <MapEvents />
            </MapContainer>
        </div>
    );
};

export default MapPicker;
