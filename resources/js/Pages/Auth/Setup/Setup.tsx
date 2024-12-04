import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import MapPicker from "./Components/MapPicker";

const Register = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        contact_number: "",
        address: "",
        lat: "",
        lng: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("complete-setup"));
    };

    return (
        <div className="flex items-center justify-center min-h-screen dark:bg-primary bg-primary/5 py-6">
            <Head title="Sign Up" />

            <form
                onSubmit={handleSubmit}
                className="border bg-white p-6 rounded-md w-full max-w-md"
            >
                <div className="mb-4">
                    <h1 className="text-xl font-medium">Complete Setting Up</h1>
                </div>

                <div className="space-y-4">
                    <div className="w-full space-y-2">
                        <label
                            htmlFor="contact_number"
                            className="block text-sm"
                        >
                            Contact Number
                        </label>
                        <Input
                            id="contact_number"
                            type="tel"
                            value={data.contact_number}
                            onChange={(e) =>
                                setData("contact_number", e.target.value)
                            }
                            placeholder="09123456789"
                            className="w-full"
                        />
                        {errors.contact_number && (
                            <div className="text-red-500 text-sm">
                                {errors.contact_number}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <MapPicker
                            setLocation={({ address, lat, lng }) => {
                                setData({
                                    ...data,
                                    address,
                                    lat: String(lat),
                                    lng: String(lng),
                                });
                            }}
                        />
                        {errors.address && (
                            <div className="text-red-500 text-sm">
                                {errors.address}
                            </div>
                        )}
                        {errors.lat && (
                            <div className="text-red-500 text-sm">
                                {errors.lat}
                            </div>
                        )}
                        {errors.lng && (
                            <div className="text-red-500 text-sm">
                                {errors.lng}
                            </div>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={processing}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Register;
