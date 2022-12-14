export type MealInfo = {
    id: number;
    quantity: number;
    name: string;
    description: string;
    image_url: string;
}

export type YumiOrder = {
    id: number;
    delivery_date: string;
    meal_count: number;
    meals: MealInfo[]
}

export type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export type SortDirection = 'asc' | 'desc';