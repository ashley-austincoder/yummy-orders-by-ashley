import './meal.css'
interface MealProps {
  quantity: number;
  name: string;
  description: string;
  imageUrl: string;
}

const Meal = (props: MealProps): JSX.Element => {
  const { quantity, name, description, imageUrl } = props;
  return (
    <div className="meal">
      <img src={imageUrl} alt={`${name}`} className="meal-img"/>
      <div>
        <p className="meal-name">
          {name} ({quantity})
        </p>
        <p>{description}</p>
      </div>

    </div>
  );
};

export default Meal;
