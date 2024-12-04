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

type Props = {
    role: "service_provider" | "customer";
};

const Register = ({ role }: Props) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        role,
        first_name: "",
        last_name: "",
        middle_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("register"));
    };

    return (
        <div className="flex items-center justify-center min-h-screen dark:bg-primary bg-primary/5 py-6">
            <Head title="Sign Up" />

            <form
                onSubmit={handleSubmit}
                className="border bg-white p-6 rounded-md w-full max-w-md"
            >
                <div className="mb-4">
                    <h1 className="text-xl font-medium">Sign Up</h1>
                </div>

                <div className="space-y-4">
                    <div className="w-full space-y-2">
                        <label htmlFor="role" className="block text-sm">
                            Role
                        </label>
                        <Select
                            onValueChange={(value) => {
                                setData(
                                    "role",
                                    value as "service_provider" | "customer"
                                );
                            }}
                            value={data.role}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="customer">
                                    Customer
                                </SelectItem>
                                <SelectItem value="service_provider">
                                    Service Provider
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.role && (
                            <div className="text-red-500 text-sm">
                                {errors.role}
                            </div>
                        )}
                    </div>

                    <div className="w-full space-y-2">
                        <label htmlFor="first_name" className="block text-sm">
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
                        <label htmlFor="middle_name" className="block text-sm">
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
                        <label htmlFor="last_name" className="block text-sm">
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
                        <label htmlFor="email" className="block text-sm">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="example@email.com"
                            className="w-full"
                        />
                        {errors.email && (
                            <div className="text-red-500 text-sm">
                                {errors.email}
                            </div>
                        )}
                    </div>

                    <div className="w-full space-y-2">
                        <label htmlFor="password" className="block text-sm">
                            Password
                        </label>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="w-full"
                        />
                        {errors.password && (
                            <div className="text-red-500 text-sm">
                                {errors.password}
                            </div>
                        )}
                    </div>

                    <div className="w-full space-y-2">
                        <label
                            htmlFor="confirm_password"
                            className="block text-sm"
                        >
                            Confirm Password
                        </label>
                        <Input
                            id="confirm_password"
                            type="password"
                            value={data.confirm_password}
                            onChange={(e) =>
                                setData("confirm_password", e.target.value)
                            }
                            className="w-full"
                        />
                        {errors.confirm_password && (
                            <div className="text-red-500 text-sm">
                                {errors.confirm_password}
                            </div>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={processing}
                    >
                        Sign Up
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Register;
