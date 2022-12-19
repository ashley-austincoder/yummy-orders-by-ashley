import { MealInfo } from '../../types';
import Meal from '../Meal/Meal';

interface OrderProps {
  id: number;
  deliveryDate: string;
  mealCount: number;
  meals: MealInfo[];
}
const Order = (props: OrderProps): JSX.Element => {
  const { id, deliveryDate, mealCount, meals } = props;
  return (
    <div className='order' key={id}>
      <div className='key-info'>
        <p>
          <span className='highlight'>Delivery Date:</span> {deliveryDate}
        </p>
        <p>
          <span className='highlight'>Meal Count:</span>
          {mealCount}
        </p>
      </div>
      <div>
        {meals.map((meal) => (
          <div key={meal.id}>
            <Meal
              quantity={meal.quantity}
              name={meal.name}
              description={meal.description}
              imageUrl={meal.image_url}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Order;
