import express from 'express';
import database from './services/db.js';
import runSqlQuery from './services/query.js';
import statusCodes from './utils/http.js';
import {
  getOrdersStartAndEndIndex,
  getSortByDeliveryDateFn,
  compileOrderInfo,
} from './utils/orderUtils.js';

import {
  getSql_AllDeliveryDates,
  getSql_AllMealsAndOrdersForUserId,
  getSql_OrderCount,
} from './utils/sqlGenerator.js';

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/api/v1/orders', async (req, res) => {
  // check params and return error if required information is missing or incorrect
  const { user_id, delivery_date, per, page, sort, direction } = req.query;
  if (!user_id) {
    res.status(statusCodes.HTTP_UNPROCESSABLE).json('User Id is Required');
    return;
  }
  if (isNaN(Number(user_id))) {
    res.status(statusCodes.BAD_REQUEST).json('User Id is Invalid');
    return;
  }

  const sql = getSql_AllMealsAndOrdersForUserId(user_id, delivery_date);
  if (!sql) {
    res
      .status(statusCodes.BAD_REQUEST)
      .json('Not enough information to retrieve orders');
    return;
  }

  try {
    const orderAndMealInfo = await runSqlQuery(sql);
    const [sliceStart, sliceEnd] = getOrdersStartAndEndIndex(per, page);

    // note: ignoring the sort param, since delivery_date is the only sort option currently supported
    const sortByDeliveryDateFn = getSortByDeliveryDateFn(direction);

    const orders = compileOrderInfo(orderAndMealInfo)
      .sort(sortByDeliveryDateFn)
      .slice(sliceStart, sliceEnd);

    res.status(statusCodes.OK).json(orders);
  } catch {
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json('Error retrieving orders');
  }
});

app.get('/api/v1/orders/getTotalCount', async (req, res) => {
  const { user_id } = req.query;
  const sql = getSql_OrderCount(user_id);

  try {
    const ordersCount = await runSqlQuery(sql);
    res.status(statusCodes.OK).json(ordersCount);
  } catch {
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json('Error retrieving total order count');
  }
});

app.get('/api/v1/users', async (req, res) => {
  const { user_id } = req.query;
  if (!user_id) {
    res.status(statusCodes.BAD_REQUEST).json('User Id is Required');
  }
  const sql = `SELECT * FROM USERS WHERE ID = ${user_id} LIMIT 1`;

  try {
    const user = await runSqlQuery(sql);
    res.status(statusCodes.OK).json(user);
  } catch {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json('Error retrieving user');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
