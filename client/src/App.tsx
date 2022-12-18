import { useState } from 'react';
import { ErrorRetrievingData } from './components/ErrorRetrievingData';
import Orders from './components/Orders';
import ChooseUser from './components/ChooseUser';
import { User } from './types';
import './App.css'

const App = (): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  return (
    <div className="App">
      <header>
        <h1>Yumi Orders</h1>
        <p>An interview project by Ashley Smith</p>
      </header>
      <main>
        <ChooseUser setCurrentUser={setCurrentUser} setErrorMessage={setErrorMessage}/>
        {currentUser && !errorMessage && <Orders username={currentUser.name} userId={currentUser.id} setErrorMessage={setErrorMessage}/>}
        {errorMessage && <ErrorRetrievingData message={errorMessage} />}
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
