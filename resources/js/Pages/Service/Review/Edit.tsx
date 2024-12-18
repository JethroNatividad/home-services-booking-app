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
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/layouts/Layout";
import { Booking, Category, ServiceRating } from "@/types";
import { useForm } from "@inertiajs/react";
import { ChevronLeft, StarIcon } from "lucide-react";
import React from "react";

type Props = {
    review: ServiceRating;
};

const Create = ({ review }: Props) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        rating: review.rating,
        review: review.review,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route("reviews.update", review.id));
    };

    return (
        <Layout>
            <div className="flex items-center space-x-4">
                <BackButton />
                <h1 className="text-xl">
                    Edit Rating of {review.service.name}
                </h1>
            </div>
            <div className="container mx-auto p-4">
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="space-y-4">
                        <div className="w-full space-y-2">
                            <label htmlFor="role" className="block text-sm">
                                Rating
                            </label>
                            <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        className={`p-1 ${
                                            star <= data.rating
                                                ? "text-yellow-400"
                                                : "text-gray-300"
                                        }`}
                                        onClick={() => setData("rating", star)}
                                    >
                                        <StarIcon className="w-8 h-8" />
                                    </button>
                                ))}
                            </div>
                            {errors.rating && (
                                <div className="text-red-500 text-sm">
                                    {errors.rating}
                                </div>
                            )}
                        </div>

                        <div className="w-full space-y-2">
                            <label htmlFor="review" className="block text-sm">
                                Review
                            </label>

                            <Textarea
                                id="review"
                                value={data.review}
                                onChange={(e) =>
                                    setData("review", e.target.value)
                                }
                                placeholder="Write your review here..."
                                className="w-full"
                                rows={4}
                            />
                            {errors.review && (
                                <div className="text-red-500 text-sm">
                                    {errors.review}
                                </div>
                            )}
                        </div>

                        <Button type="submit" disabled={processing}>
                            Update
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Create;
