/**
 *
 * @param {*} userId number - id of the user to request orders for
 * @param {*} deliveryDate date || undefined - specified delivery date
 * @returns SQL SELECT statement to retrieve all relevant information for the users orders
 *
 * NOTE: This selects all orders, and does not account for pagination limits.
 * More data is requested from the database than will be returned to the user which is a performance cost,
 * however retrieving all required data in one SQL query was determined to be acceptable as it improves readability
 */
export const getSql_AllMealsAndOrdersForUserId = (
    userId,
    deliveryDate
  ) => {
    const whereClause = `USER_ID = ${userId} ${
      deliveryDate ? `AND DELIVERY_DATE = ${deliveryDate}` : ``
    }`;
    return `
      SELECT * FROM ORDERS O
      INNER JOIN ORDER_ATTRIBUTES A ON O.ID = A.ORDER_ID 
      INNER JOIN MEALS M ON M.ID = A.MEAL_ID
      WHERE ${whereClause}
    `;
  };

  export const getSql_OrderCount = (userId) => {
    return `SELECT COUNT(ID) FROM ORDERS WHERE USER_ID = ${userId}`
  }

  // export default getSql_AllMealsAndOrdersForUserId;