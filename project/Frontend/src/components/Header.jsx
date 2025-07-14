import React, { useState } from 'react';
import { Upload, Code, Database, Globe, Palette, User as UserIcon, LogOut, Star } from 'lucide-react';
import UploadModal from './UploadModal';
import GithubLoginModal from './GithubLoginModal';

const Header = ({
  activeSection,
  setActiveSection,
  onUpload,
  isGithubLoggedIn,
  onGithubLogin,
  user,
  onLogout
}) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showGithubModal, setShowGithubModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const sections = [
    { id: 'uiux', label: 'UI/UX', icon: Palette },
    { id: 'frontend', label: 'Frontend', icon: Code },
    { id: 'backend', label: 'Backend', icon: Database },
    { id: 'fullstack', label: 'Full-Stack', icon: Globe }
  ];

  const handleUploadClick = () => {
    if (isGithubLoggedIn) {
      setShowUploadModal(true);
    } else {
      setShowGithubModal(true);
    }
  };

  const handleGithubLogin = (userInfo) => {
    onGithubLogin(userInfo);
    setShowGithubModal(false);
    setShowUploadModal(true);
  };

  const handleProfileClick = () => {
    setShowProfileMenu((prev) => !prev);
  };

  const handleLogoutClick = () => {
    setShowProfileMenu(false);
    onLogout();
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    DevPractice
                  </h1>
                  <p className="text-xs text-gray-500 -mt-1">Project Showcase</p>
                </div>
              </div>
              <nav className="hidden lg:flex space-x-1">
                {sections.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveSection(id)}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeSection === id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleUploadClick}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2.5 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:block">Upload Project</span>
              </button>
              {isGithubLoggedIn && user && (
                <div className="relative">
                  <button
                    onClick={handleProfileClick}
                    className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md focus:outline-none"
                  >
                    <UserIcon className="w-5 h-5 text-white" />
                  </button>
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-3xl shadow-2xl border border-gray-200/50 py-4 px-6 z-50">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <UserIcon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <div className="font-bold text-lg text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex flex-col items-center">
                          <span className="text-2xl font-bold text-blue-600">5</span>
                          <span className="text-xs text-gray-500">Challenges Completed</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="flex items-center text-2xl font-bold text-yellow-500"><Star className="w-5 h-5 mr-1" />4.8</span>
                          <span className="text-xs text-gray-500">Rating</span>
                        </div>
                      </div>
                      <button
                        onClick={handleLogoutClick}
                        className="w-full mt-2 flex items-center justify-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="lg:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-md">
          <div className="flex justify-around py-2">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`flex flex-col items-center space-y-1 p-3 rounded-xl transition-all duration-300 ${
                  activeSection === id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>
      <GithubLoginModal isOpen={showGithubModal} onClose={() => setShowGithubModal(false)} onGithubLogin={handleGithubLogin} />
      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={onUpload}
      />
    </>
  );
};

export default Header;