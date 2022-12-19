import { Error } from "./components/Error";
import Orders from "./components/Orders/Orders";
import { User } from "./types";
import "./App.css";
import useQueryParam from "./hooks/useQueryParam";
import useFetch from "./hooks/useFetch";
import { getUserInfoRoute } from "./services/apiRoutes";

const App = (): JSX.Element => {
  const [userID] = useQueryParam("user_id", "");

  const route = userID && getUserInfoRoute(userID);

  const { error, data: userData } = useFetch<User[]>(route);
  const userNotFound = userData && !userData.length;
  const username = userData && userData[0].name;
  return (
    <div className="App">
      <header>
        <h1>Yummy Orders</h1>
        <p>An interview project by Ashley Smith</p>
      </header>
      <main>
        {!userNotFound && <Orders userID={userID} username={username}/>}
        {(error || userNotFound) && (
          <Error
            message={
              userNotFound
                ? "User not found"
                : "Error retrieving user information"
            }
          />
        )}
      </main>
      <footer></footer>
    </div>
  );
};

export default App;
