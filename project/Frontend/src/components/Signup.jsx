import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!form.username.trim()) errors.username = 'Username is required';
    if (!form.email.trim()) errors.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errors.email = 'Invalid email address';
    if (!form.password) errors.password = 'Password is required';
    else if (form.password.length < 6) errors.password = 'Password must be at least 6 characters';
    return errors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    try {
      await axios.post('http://localhost:5000/api/auth/signup', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-xl w-96">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700">Sign Up</h2>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        <div className="mb-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${fieldErrors.username ? 'border-red-400' : 'mb-1'}`}
            required
          />
          {fieldErrors.username && <div className="text-red-500 text-sm">{fieldErrors.username}</div>}
        </div>
        <div className="mb-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${fieldErrors.email ? 'border-red-400' : 'mb-1'}`}
            required
          />
          {fieldErrors.email && <div className="text-red-500 text-sm">{fieldErrors.email}</div>}
        </div>
        <div className="mb-7">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${fieldErrors.password ? 'border-red-400' : 'mb-1'}`}
            required
          />
          {fieldErrors.password && <div className="text-red-500 text-sm">{fieldErrors.password}</div>}
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition">Sign Up</button>
        <div className="mt-6 text-center">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Signup;