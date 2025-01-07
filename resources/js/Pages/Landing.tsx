import { Link } from "@inertiajs/react";
import { ArrowRight, Briefcase, CalendarDays, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Landing = () => {
    return (
        <div>
            <header className="fixed left-0 top-0 z-50 h-20 w-full bg-background py-5 shadow-sm">
                <div className="container mx-auto flex items-center justify-between px-5">
                    <div>
                        <h1 className="text-xl">Home Services Booking App</h1>
                    </div>

                    <div className="space-x-5">
                        <DropdownMenu>
                            <Button asChild className="px-7 py-5 text-lg">
                                <DropdownMenuTrigger>
                                    Sign Up
                                </DropdownMenuTrigger>
                            </Button>
                            <DropdownMenuContent>
                                <DropdownMenuItem className="group">
                                    <Link
                                        href={route("register", {
                                            role: "service_provider",
                                        })}
                                        className="flex items-center"
                                    >
                                        Service Provider
                                        <ArrowRight className="ml-1 opacity-0 transition-opacity group-hover:opacity-100" />
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="group">
                                    <Link
                                        href={route("register", {
                                            role: "customer",
                                        })}
                                        className="flex items-center"
                                    >
                                        Customer
                                        <ArrowRight className="ml-1 opacity-0 transition-opacity group-hover:opacity-100" />
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button
                            variant="outline"
                            className="px-7 py-5 text-lg"
                            asChild
                        >
                            <Link href={route("login")}>Login</Link>
                        </Button>
                    </div>
                </div>
            </header>
            <main className="space-y-60 pb-40 pt-20">
                <section className="relative mx-auto h-[600px] w-full px-5">
                    <img
                        src="/images/hero.jpg"
                        alt="Home Services"
                        className="object-cover h-full w-full"
                    />
                    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-white bg-opacity-25">
                        <div className="max-w-3xl">
                            <div className="mb-5">
                                <h1 className="mb-3 text-5xl font-semibold">
                                    Effortlessly Connect with Trusted Home
                                    Service Providers
                                </h1>
                                <p className="text-lg">
                                    Book a professional for your home needs, or
                                    offer your services in just a few clicks.
                                </p>
                            </div>
                            <div className="space-x-3">
                                <Button className="px-10 py-5 text-lg" asChild>
                                    <Link href="/register?role=service_provider">
                                        Sign Up as a Service Provider
                                    </Link>
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="px-10 py-5 text-lg"
                                    asChild
                                >
                                    <Link href="/register?role=customer">
                                        Find a Service
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-5">
                    <h2 className="mb-7 text-center text-3xl font-medium">
                        How It Works
                    </h2>

                    <div className="mx-auto grid max-w-7xl grid-cols-3 gap-10">
                        <div className="relative rounded-md bg-secondary p-7">
                            <div className="mb-5 w-fit rounded-full border bg-white p-3">
                                <Wrench />
                            </div>
                            <h3 className="mb-3 text-3xl font-medium">
                                Browse and Book Services
                            </h3>
                            <p className="">
                                Find services from skilled professionals for
                                everything from cleaning to repairs.
                            </p>
                        </div>

                        <div className="relative rounded-md bg-secondary p-7">
                            <div className="mb-5 w-fit rounded-full border bg-white p-3">
                                <CalendarDays />
                            </div>
                            <h3 className="mb-3 text-3xl font-medium">
                                Schedule with Ease
                            </h3>
                            <p className="">
                                Book services at a time that fits your schedule.
                            </p>
                        </div>

                        <div className="relative rounded-md bg-secondary p-7">
                            <div className="mb-5 w-fit rounded-full border bg-white p-3">
                                <Briefcase />
                            </div>
                            <h3 className="mb-3 text-3xl font-medium">
                                Offer Your Services
                            </h3>
                            <p className="">
                                Sign up and list your services for customers to
                                find you.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-5">
                    <div>
                        <div className="mb-5">
                            <h2 className="mb-3 text-center text-5xl font-medium">
                                Join Us Today
                            </h2>
                            <p className="text-center text-xl">
                                Whether you&apos;re looking for help around the
                                house or ready to offer your skills, we&apos;ve
                                got you covered.
                            </p>
                        </div>
                        <div className="mx-auto w-fit space-x-3">
                            <Button className="px-10 py-5 text-lg" asChild>
                                <Link href="/register?role=service_provider">
                                    Become a Service Provider
                                </Link>
                            </Button>
                            <Button
                                variant="secondary"
                                className="px-10 py-5 text-lg"
                                asChild
                            >
                                <Link href="/register?role=customer">
                                    Find a Service
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="border-t py-7">
                <div className="container mx-auto">
                    <p className="text-center">
                        All rights reserved &copy; {new Date().getFullYear()}
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
