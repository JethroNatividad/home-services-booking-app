import { Category, Service } from "@/types";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import ServiceCard from "./service-card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Link } from "@inertiajs/react";

type Props = {
    services: Service[];
    categories: Category[];
};

const ManageServices = ({ services: initialServices, categories }: Props) => {
    const [services, setServices] = useState<Service[]>(initialServices);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    useEffect(() => {
        const filteredServices = initialServices.filter((service) => {
            const matchesSearch =
                service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            const matchesCategory =
                selectedCategory === "all" ||
                String(service.category.id) === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        setServices(filteredServices);
    }, [searchTerm, selectedCategory, initialServices]);

    return (
        <div className="container mx-auto p-4">
            <div className="mb-8 space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-1">
                        <Label htmlFor="search">Search</Label>
                        <Input
                            id="search"
                            placeholder="Search services..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="category">Category</Label>
                        <Select
                            value={selectedCategory}
                            onValueChange={setSelectedCategory}
                        >
                            <SelectTrigger id="category">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All Categories
                                </SelectItem>
                                {categories.map((category) => (
                                    <SelectItem
                                        key={category.id}
                                        value={String(category.id)}
                                    >
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Button className="w-fit">
                    <Link href={route("services.create")}>Create Service</Link>
                </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {services.length === 0 && (
                    <div className="text-center text-gray-500">
                        You have no services yet.
                    </div>
                )}
                {services.map((service) => (
                    <ServiceCard key={service.id} {...service} />
                ))}
            </div>
        </div>
    );
};

export default ManageServices;
