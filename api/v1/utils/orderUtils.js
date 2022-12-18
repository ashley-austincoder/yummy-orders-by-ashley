/**
 * 
 * @param {*} userId number - id of the user to request orders for
 * @param {*} deliveryDate date || undefined - specified delivery date
 * @returns SQL SELECT statement to retrieve all relevant information for the users orders
 * 
 * NOTE: This selects all orders, and does not account for pagination limits (default 4 order per request). 
 * More data is being requested from the database than will be returned to the user which is a performance cost, 
 * however due to multiple INNER JOINS needed for this project it was determined to be an acceptable trade-off for readability
 */
getSqlSelect_AllMealsAndOrdersForUserId = (userId, deliveryDate) => {
    const selectStatement = `
    SELECT * FROM ORDERS O
    INNER JOIN ORDER_ATTRIBUTES A ON O.ID = A.ORDER_ID 
    INNER JOIN MEALS M ON M.ID = A.MEAL_ID
    WHERE USER_ID = ${userId}
    `;
    if (deliveryDate) {
    select += ` AND DELIVERY_DATE = ${deliveryDate}`;
    }
    return selectStatement;
}


/**
 * 
 * @param {*} direction 'asc' or 'desc'
 * @returns function that can be passed to Array.sort() that will order the orders by delivery_date 
 * in ascending (default) or descending order
 */
const getSortByDeliveryDateFn = (direction) => {
  if (!direction || (direction.toLowerCase() !== 'asc' && direction.toLowerCase() !== 'desc')) {
    direction = 'asc';
  }
  const getTimeFromDelivery = (deliveryDate) => new Date(deliveryDate).getTime();

  const sortFn = (orderA, orderB) => {
    if (getTimeFromDelivery(orderA.delivery_date) > getTimeFromDelivery(orderB.delivery_date)) {
      return direction === 'asc' ? 1 : -1;
    }
    return direction === 'asc' ? -1 : 1;
  }
  return sortFn;
}

/**
 * @param {*} per how many order items to return per page
 * @param {*} page which page orders being requested
 * @returns start and end index to slice the array of orders to the relevant count and page
 */
const getOrdersStartAndEndIndex = (per, page) => {
  // set defaults if query param data is bad
  if (!per || isNaN(Number(per))) {
    per = 4;
  }
  if (!page || isNaN(Number(page))) {
    page = 1;
  }
  per = Number(per);
  page = Number(page);
  const startIndex = per * (page - 1);
  const endIndex = startIndex + per;
  return [startIndex, endIndex];
}

/**
 * 
 * @param {*} mealsWithOrderInfo array of objects containing all meal information for a users orders
 * @returns An array with each order as an item, should include the id, delivery_date, meal_count, and an array of meals
 * meals should be an array of meals included with that order (id, quantity, name, desciption, image_url) 
 */
const compileOrderInfo = (mealsWithOrderInfo) => {
    const orderMap = new Map();
    mealsWithOrderInfo.forEach(info => {
      const { delivery_date, meal_id, order_id, quantity, name, desciption, image_url } = info;
      const meal = {
        id: meal_id,
        quantity,
        name,
        desciption,
        image_url
      };
      const order = orderMap.get(order_id);
      if (!order) {
        // order is not tracked yet, start with provided meal information
        orderMap.set(order_id, {
          id: order_id,
          delivery_date,
          meal_count: quantity,
          meals: [meal]
        })
      } else {
        // order is already tracked, add meal and update quantities
        const updatedOrder = {...order};
        updatedOrder.meal_count += quantity;
        updatedOrder.meals.push(meal)
        orderMap.set(order_id, updatedOrder);
      }
    });
    // turn map of orders into an array
    return Array.from(orderMap, ([, value]) => (value));
  }

  module.exports = {
    compileOrderInfo,
    getOrdersStartAndEndIndex,
    getSortByDeliveryDateFn,
    getSqlSelect_AllMealsAndOrdersForUserId
  }