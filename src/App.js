import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleSubmit = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };

    //post data to server

    fetch('http://localhost:5000/user', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        const newUser = [...users, data];
        setUsers(newUser)
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name='name' placeholder='Name' />
        <input type="email" name="email" placeholder='Email' />
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>{user.id} {user.name} {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
