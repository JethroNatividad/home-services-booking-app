import { ReviewCard } from "@/components/review-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Layout from "@/layouts/Layout";
import { Service } from "@/types";
import { Link } from "@inertiajs/react";
import { User, Star, ChevronLeft } from "lucide-react";

type Props = {
    service: Service;
};

const Show = ({ service }: Props) => {
    return (
        <Layout>
            <div className="container mx-auto p-4 space-y-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href={route("dashboard")}>
                        <ChevronLeft className="h-6 w-6" />
                    </Link>
                </Button>
                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <div className="relative h-[400px] w-full mb-4">
                            <img
                                src={
                                    service.images?.length > 0
                                        ? service.images[0]
                                        : ""
                                }
                                // src="https://venusbeautycentury.com/wp-content/uploads/2021/12/Gel-Nails-Singapore.jpg"
                                alt={service.name}
                                className="rounded-lg object-cover w-full h-full"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {service.images?.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative h-20 w-full"
                                >
                                    <img
                                        src={image}
                                        alt={`${service.name} thumbnail ${
                                            index + 1
                                        }`}
                                        className="rounded-lg object-cover w-full h-full"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-4">
                            {service.name}
                        </h1>
                        <div className="flex items-center space-x-2 mb-4">
                            <User className="h-4 w-4" />
                            <span className="text-sm text-muted-foreground">
                                {service.user.first_name}{" "}
                                {service.user.middle_name}{" "}
                                {service.user.last_name}
                            </span>
                        </div>
                        <p className="text-muted-foreground mb-4">
                            {service.description}
                        </p>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-3xl font-bold">
                                ${service.price}
                            </span>
                            <Badge variant="secondary">
                                {service.category.name}
                            </Badge>
                        </div>
                        <div className="flex items-center space-x-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-5 w-5 ${
                                        i < Math.round(service.rating)
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300"
                                    }`}
                                />
                            ))}
                            <span className="text-sm text-muted-foreground ml-2">
                                {service.rating}
                            </span>
                            <span className="text-sm text-muted-foreground ml-2">
                                ({service.review_count} reviews)
                            </span>
                        </div>
                        <Button className="w-full">Book Now</Button>
                    </div>
                </div>
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Reviews</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        {service.ratings.length === 0 && <p>No reviews yet.</p>}
                        {service.ratings.map((review) => (
                            <ReviewCard key={review.id} {...review} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Show;
