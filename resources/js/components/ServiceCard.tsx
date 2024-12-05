import { Star, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

interface ServiceCardProps {
    imageUrl: string;
    authorName: string;
    serviceName: string;
    description: string;
    price: number;
    category: string;
    rating: number;
    reviewCount: number;
}

export default function ServiceCard({
    imageUrl,
    authorName,
    serviceName,
    description,
    price,
    category,
    rating,
    reviewCount,
}: ServiceCardProps) {
    const truncatedDescription =
        description.length > 100
            ? `${description.substring(0, 97)}...`
            : description;

    return (
        <Card className="w-full max-w-sm overflow-hidden">
            <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                    <img
                        src={imageUrl}
                        alt={serviceName}
                        className="transition-transform duration-300 ease-in-out hover:scale-105 object-cover w-full h-full"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm text-muted-foreground">
                        {authorName}
                    </span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{serviceName}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    {truncatedDescription}
                </p>
                <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-lg">
                        ${price.toFixed(2)}
                    </span>
                    <Badge variant="secondary">{category}</Badge>
                </div>
                <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`h-4 w-4 ${
                                i < Math.round(rating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                            }`}
                        />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">
                        ({reviewCount} reviews)
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
