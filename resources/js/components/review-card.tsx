import { Star, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ServiceRating } from "@/types";

export function ReviewCard({ rating, user, review }: ServiceRating) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src="" alt={user.first_name} />
                        <AvatarFallback>
                            {user.first_name.charAt(0)}
                            {user.last_name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">
                            {user.first_name} {user.middle_name}{" "}
                            {user.last_name}
                        </p>
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                        i < rating
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300"
                                    }`}
                                />
                            ))}
                            <span className="ml-2 text-sm text-muted-foreground">
                                {rating.toFixed(1)}
                            </span>
                        </div>
                    </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{review}</p>
            </CardContent>
        </Card>
    );
}
