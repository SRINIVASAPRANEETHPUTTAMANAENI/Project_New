import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!form.email.trim()) errors.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errors.email = 'Invalid email address';
    if (!form.password) errors.password = 'Password is required';
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
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-xl w-96">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700">Login</h2>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
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
        <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition">Login</button>
        <div className="mt-6 text-center">
          Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;