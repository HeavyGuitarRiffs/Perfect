import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/register', { email, password });
      alert('User registered successfully');
      // Reset form fields
      setEmail('');
      setPassword('');
      // Optionally, redirect here
      // window.location.href = '/login';
    } catch (error) {
      console.error('Error registering user:', error.message);
      setError('Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>{loading ? 'Signing Up...' : 'Sign Up'}</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default SignUp;

