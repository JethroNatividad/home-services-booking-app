import MapPicker from "@/components/map-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/layouts/Layout";
import { User } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { toast } from "sonner";

const Edit = () => {
    const user = usePage().props.auth.user;
    const { data, setData, put, processing, errors } = useForm({
        contact_number: user.contact_number,
        address: user.address,
        lat: user.lat,
        lng: user.lng,

        first_name: user.first_name,
        last_name: user.last_name,
        middle_name: user.middle_name,

        email: user.email,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route("profile.update"), {
            onSuccess: () => {
                toast.success("Profile updated successfully");
            },
        });
    };

    return (
        <Layout>
            <div className="space-y-4">
                <h1 className="text-xl">Account</h1>
                <hr />
                <form onSubmit={handleSubmit} className="w-full max-w-xl">
                    <div className="space-y-4">
                        <div className="w-full space-y-2">
                            <label
                                htmlFor="first_name"
                                className="block text-sm"
                            >
                                First Name
                            </label>
                            <Input
                                id="first_name"
                                type="text"
                                value={data.first_name}
                                onChange={(e) =>
                                    setData("first_name", e.target.value)
                                }
                                placeholder="Juan"
                                className="w-full"
                            />
                            {errors.first_name && (
                                <div className="text-red-500 text-sm">
                                    {errors.first_name}
                                </div>
                            )}
                        </div>

                        <div className="w-full space-y-2">
                            <label
                                htmlFor="middle_name"
                                className="block text-sm"
                            >
                                Middle Name (Optional)
                            </label>
                            <Input
                                id="middle_name"
                                type="text"
                                value={data.middle_name}
                                onChange={(e) =>
                                    setData("middle_name", e.target.value)
                                }
                                placeholder="Dela"
                                className="w-full"
                            />
                            {errors.middle_name && (
                                <div className="text-red-500 text-sm">
                                    {errors.middle_name}
                                </div>
                            )}
                        </div>

                        <div className="w-full space-y-2">
                            <label
                                htmlFor="last_name"
                                className="block text-sm"
                            >
                                Last Name
                            </label>
                            <Input
                                id="last_name"
                                type="text"
                                value={data.last_name}
                                onChange={(e) =>
                                    setData("last_name", e.target.value)
                                }
                                placeholder="Cruz"
                                className="w-full"
                            />
                            {errors.last_name && (
                                <div className="text-red-500 text-sm">
                                    {errors.last_name}
                                </div>
                            )}
                        </div>
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
                                initialLocation={{
                                    address: data.address,
                                    lat: parseFloat(data.lat),
                                    lng: parseFloat(data.lng),
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
        </Layout>
    );
};

export default Edit;
