import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Layout from "@/layouts/Layout";
import { Category } from "@/types";
import { useForm } from "@inertiajs/react";
import React from "react";

type Props = {
    categories: Category[];
};

const Create = ({ categories }: Props) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        category_id: "",
        name: "",
        description: "",
        price: "",
        images: [],
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("services.store"));
    };

    return (
        <Layout>
            <h1 className="text-xl">Create Service</h1>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="space-y-4">
                    <div className="w-full space-y-2">
                        <label htmlFor="role" className="block text-sm">
                            Category
                        </label>
                        <Select
                            onValueChange={(value) => {
                                setData("category_id", value);
                            }}
                            value={data.category_id}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem
                                        key={category.id}
                                        value={category.id.toString()}
                                    >
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.category_id && (
                            <div className="text-red-500 text-sm">
                                {errors.category_id}
                            </div>
                        )}
                    </div>

                    <div className="w-full space-y-2">
                        <label htmlFor="name" className="block text-sm">
                            Name
                        </label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Juan"
                            className="w-full"
                        />
                        {errors.name && (
                            <div className="text-red-500 text-sm">
                                {errors.name}
                            </div>
                        )}
                    </div>

                    <Button type="submit" disabled={processing}>
                        Create Service
                    </Button>
                </div>
            </form>
        </Layout>
    );
};

export default Create;
