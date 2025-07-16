import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Section from './components/Section';
import { projectsAPI } from './services/api';

function MainApp() {
  const [activeSection, setActiveSection] = useState('uiux');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isGithubLoggedIn, setIsGithubLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Authentication guard
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    fetchProjects();
  }, [navigate]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (err) {
      setError('Failed to load projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (project) => {
    try {
      setProjects([project, ...projects]);
    } catch (err) {
      console.error('Error adding project:', err);
    }
  };

  const handleGithubLogin = (userInfo) => {
    setIsGithubLoggedIn(true);
    setUser(userInfo);
  };

  const handleLogout = () => {
    setIsGithubLoggedIn(false);
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getSectionData = () => {
    switch (activeSection) {
      case 'uiux':
        return {
          title: 'UI/UX Design',
          description: 'Discover stunning designs and prototypes.',
          projects: projects.filter(p => p.section === 'uiux')
        };
      case 'frontend':
        return {
          title: 'Frontend Development',
          description: 'Explore interactive user interfaces.',
          projects: projects.filter(p => p.section === 'frontend')
        };
      case 'backend':
        return {
          title: 'Backend Development',
          description: 'Dive into server-side implementations.',
          projects: projects.filter(p => p.section === 'backend')
        };
      case 'fullstack':
        return {
          title: 'Full-Stack Development',
          description: 'Complete end-to-end applications.',
          projects: projects.filter(p => p.section === 'fullstack')
        };
      default:
        return {
          title: 'UI/UX Design',
          description: 'Discover stunning designs.',
          projects: projects.filter(p => p.section === 'uiux')
        };
    }
  };

  const sectionData = getSectionData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onUpload={handleUpload}
        isGithubLoggedIn={isGithubLoggedIn}
        onGithubLogin={handleGithubLogin}
        user={user}
        onLogout={handleLogout}
      />
      {error && (
        <div className="mx-4 mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      <Section
        section={activeSection}
        title={sectionData.title}
        description={sectionData.description}
        projects={sectionData.projects}
      />
    </div>
  );
}

export default MainApp;