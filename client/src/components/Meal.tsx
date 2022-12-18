interface MealProps {
    quantity: number;
    name: string;
    description: string;
    imageUrl: string;
}

const Meal = (props: MealProps): JSX.Element => {
    const { quantity, name, description, imageUrl } = props;
    return <div>I am a {name} meal</div>
}

export default Meal;