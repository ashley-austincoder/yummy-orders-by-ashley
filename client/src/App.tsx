import { useState } from 'react';
import Orders from './components/Orders';
import UserLogin from './components/UserLogin';
import { User } from './types';

const App = (): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Yumi Orders</h1>
        <p>An interview project by Ashley Smith</p>
      </header>
      <main>
        <UserLogin setCurrentUser={setCurrentUser}/>
        {currentUser && <Orders username={currentUser.name} userId={currentUser.id} />}
        <p>CurrentUser? {currentUser?.name}</p>
      </main>
      <footer>
        <p>Dec 2022</p>
      </footer>
    </div>
  );
}

export default App;
