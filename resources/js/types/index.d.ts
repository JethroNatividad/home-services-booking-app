export interface User {
    id: number;
    email: string;
    email_verified_at?: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    role: string;
    created_at: string;
    updated_at: string;
    completed: boolean;
    contact_number: string;
    address: string;
    lat: string;
    lng: string;
}

export interface Booking {
    id: number;
    user: User;
    service: Service;
    datetime: string;
    status: "pending" | "active" | "rejected" | "completed" | "canceled";
    created_at: string;
    updated_at: string;
}
export interface ServiceRating {
    id: number;
    user: User;
    booking: Booking;
    rating: number;
    review: string;
    created_at: string;
    updated_at: string;
    service: Service;
}
export interface Category {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    created_at: string;
    updated_at: string;
    user: User;
    category: Category;
    rating: number;
    review_count: number;
    images: string[];
    ratings: ServiceRating[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
