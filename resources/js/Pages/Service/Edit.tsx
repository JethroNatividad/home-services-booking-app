import BackButton from "@/components/back-button";
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
import type { Service, Category } from "@/types";
import { useForm } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";
import React from "react";

type Props = {
    categories: Category[];
    service: Service;
};

const Edit = ({ categories, service }: Props) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        category_id: service.category.id.toString(),
        name: service.name,
        description: service.description,
        price: service.price.toString(),
        images: null as FileList | null,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("category_id", data.category_id);
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);

        // Append multiple files
        if (data.images) {
            Array.from(data.images).forEach((file) => {
                formData.append("images[]", file);
            });
        }
        post(route("services.update", service.id), {
            forceFormData: true,
            data: formData,
            preserveScroll: true,
        });
    };

    return (
        <Layout>
            <div className="flex items-center space-x-4">
                <BackButton />
                <h1 className="text-xl">Edit Service</h1>
            </div>
            <div className="container mx-auto p-4">
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
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder="Juan"
                                className="w-full"
                            />
                            {errors.name && (
                                <div className="text-red-500 text-sm">
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        <div className="w-full space-y-2">
                            <label
                                htmlFor="description"
                                className="block text-sm"
                            >
                                Description
                            </label>
                            <Input
                                id="description"
                                type="text"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                placeholder="Description"
                                className="w-full"
                            />
                            {errors.description && (
                                <div className="text-red-500 text-sm">
                                    {errors.description}
                                </div>
                            )}
                        </div>

                        <div className="w-full space-y-2">
                            <label htmlFor="price" className="block text-sm">
                                Price
                            </label>
                            <Input
                                id="price"
                                type="number"
                                value={data.price}
                                onChange={(e) =>
                                    setData("price", e.target.value)
                                }
                                placeholder="Price"
                                className="w-full"
                            />
                            {errors.price && (
                                <div className="text-red-500 text-sm">
                                    {errors.price}
                                </div>
                            )}
                        </div>

                        <div className="w-full space-y-2">
                            <label htmlFor="images" className="block text-sm">
                                Images
                            </label>
                            <Input
                                id="images"
                                type="file"
                                multiple
                                onChange={(e) =>
                                    setData("images", e.target.files)
                                }
                                className="w-full"
                            />
                            {errors.images && (
                                <div className="text-red-500 text-sm">
                                    {errors.images}
                                </div>
                            )}
                        </div>

                        <Button type="submit" disabled={processing}>
                            Edit Service
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Edit;
