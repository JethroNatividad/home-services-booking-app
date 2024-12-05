import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { FormEventHandler } from "react";

type Props = {
    role: "service_provider" | "customer";
};

const Register = ({ role }: Props) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen dark:bg-primary bg-primary/5 py-6">
            <Head title="Sign Up" />

            <form
                onSubmit={handleSubmit}
                className="border bg-white p-6 rounded-md w-full max-w-md"
            >
                <div className="mb-4">
                    <h1 className="text-xl font-medium">Log In</h1>
                </div>

                <div className="space-y-4">
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

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={processing}
                    >
                        Login
                    </Button>

                    <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href={route("register")} className="underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;
