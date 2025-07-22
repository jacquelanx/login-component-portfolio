import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token); // true if token exists
  }, []);

  const handleSignup = async () => {
    try {
      const res = await axios.post('http://localhost:5000/user/signup', { email, password });
      alert('Signup successful! Now login.');
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  const handleSignin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/user/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setLoggedIn(true); // update state
      alert('Signed in! Token stored.');
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setEmail('');
    setPassword('');
    alert('Logged out!');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🩷 Auth Test</h1>

      <p>Status: {loggedIn ? `✅ Logged In as ${email}` : '❌ Not Logged In'}</p>

      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
      <input type="Password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={handleSignin}>Sign In</button>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default App;
