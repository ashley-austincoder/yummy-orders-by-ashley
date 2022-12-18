const express = require("express");
const database = require('./services/db.js');
const { statusCodes } = require("./utils/http.js");
const { getOrdersStartAndEndIndex, getSortByDeliveryDateFn, compileOrderInfo, getSqlSelect_AllMealsAndOrdersForUserId } = require("./utils/orderUtils.js");

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/api/v1/orders', (req, res) => {
  // check params and return error if required information is missing or incorrect
  const { user_id, delivery_date, per, page, sort, direction } = req.query;
  if (!user_id) {
    res.status(statusCodes.HTTP_UNPROCESSABLE).errored('User Id is Required');
    return;
  } 
  if (isNaN(Number(user_id))) {
    res.status(statusCodes.BAD_REQUEST).errored('User Id is Invalid')
    return;
  }
  const sqlSelectOrders = getSqlSelect_AllMealsAndOrdersForUserId(user_id, delivery_date);
  if (!sqlSelectOrders) {
    res.status(statusCodes.BAD_REQUEST).send('Not enough information to retrieve orders.')
    return;
  }
  
  // retrieve all order and meal information, then compile into expected data model, 
  // sort and limit results to requested page / per page order count
  database.query(sqlSelectOrders, (error, mealAndOrderInfo) => {
    if (error) {
      res.status(statusCodes.INTERNAL_SERVER_ERROR).errored(error);
      return;
    }
    const [ sliceStart, sliceEnd ] = getOrdersStartAndEndIndex(per, page);

    const sortByDeliveryDateFn = getSortByDeliveryDateFn(direction);
  
    const orders = compileOrderInfo(mealAndOrderInfo)
      .sort(sortByDeliveryDateFn)
      .slice(sliceStart, sliceEnd);

    res.status(statusCodes.OK).send(orders);
  });
});

app.get("/api/v1/users", (req, res) => {
  database.query('SELECT * FROM USERS', (error, users) => {
    if (error) {
      res.status(statusCodes.INTERNAL_SERVER_ERROR).send('Error retrieving users');
    }
    res.status(statusCodes.OK).send(users);
  })
})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});