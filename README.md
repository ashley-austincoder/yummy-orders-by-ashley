# yummy-orders-by-ashley
Take home interview project for Yumi Engineering, by Ashley Smith

This is a React + Node.js app backed by a MySQL database seeded with the initial project sql.dump file. It retrieves orders for a user based on the `user_id` provided as a query parameter (this is assuming the user authenticated and logged in already), and displays them to the user. The UI provides pagination and sort functionality, and a `delivery_date` filter is supported via query parameter.


Instructions to Run Project
------------

1. `git clone` project
2. Ensure you have Node 12+ installed (I used v16.18.1 for development, believe 12+ has requirements for modules but use this version if needed)
1. `npm install` in root to install dependencies
2. `npm start` in root to start node.js server
3. In another terminal, `cd client` from root, then run `npm install` and `npm start` to start React application
4. App will load on `http://localhost:3000/`
5. user_id parameter is required to show orders for a user, add `&user_id=1` or `&user_id=2` to see those users orders and pagination and sorting functionality
6. Try adding another user_id, both a number and a random string and see how the app responds to unknown users
7. Filter the results for a user with a `delivery_date` query parameter: `http://localhost:3000/?user_id=2&delivery_date=2018-06-01`

Instructions to Run Tests
------------
1. Navigate to the project root
2. Install ruby if necessary
3. Install the `bundler` gem if necessary
4. Run `bundle install`
5. Make sure your application server is running (npm start from root)
6. Run tests with: `bundle exec rspec`
