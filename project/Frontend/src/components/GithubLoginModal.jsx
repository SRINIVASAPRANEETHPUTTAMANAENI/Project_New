import React, { useState } from 'react';
import { Github } from 'lucide-react';

const GithubLoginModal = ({ isOpen, onClose, onGithubLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 text-center">
        <Github className="w-16 h-16 mx-auto text-gray-800 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Login with GitHub</h2>
        <p className="text-gray-600 mb-6">You must login with your GitHub account to upload a project.</p>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (name && email) {
              onGithubLogin({ name, email });
            }
          }}
          className="space-y-4 mb-4"
        >
          <input
            type="text"
            placeholder="GitHub Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            required
          />
          <input
            type="email"
            placeholder="GitHub Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            required
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors font-semibold text-lg"
          >
            <Github className="w-5 h-5 mr-2" />
            <span>Login with GitHub</span>
          </button>
        </form>
        <button
          onClick={onClose}
          className="w-full mt-2 text-gray-500 hover:text-gray-700 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default GithubLoginModal; 