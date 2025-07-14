// Mock data for projects
const mockProjects = [
  {
    _id: '1',
    title: 'Modern E-commerce Dashboard',
    description: 'A beautiful and responsive e-commerce dashboard built with React and Tailwind CSS. Features include product management, order tracking, and analytics.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
    section: 'frontend',
    author: 'Sarah Johnson',
    uploadedAt: '2024-01-15T10:30:00Z',
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    link: 'https://github.com/sarah/ecommerce-dashboard',
    likes: 24,
    views: 156
  },
  {
    _id: '2',
    title: 'Minimalist Portfolio Design',
    description: 'Clean and modern portfolio design showcasing creative work with smooth animations and intuitive navigation.',
    techStack: ['Figma', 'Adobe XD', 'Design System', 'Prototyping'],
    section: 'uiux',
    author: 'Mike Chen',
    uploadedAt: '2024-01-14T14:20:00Z',
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    link: 'https://figma.com/file/portfolio-design',
    likes: 18,
    views: 89
  },
  {
    _id: '3',
    title: 'RESTful API with Node.js',
    description: 'Complete REST API implementation with authentication, file uploads, and database integration using Node.js and MongoDB.',
    techStack: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    section: 'backend',
    author: 'Alex Rodriguez',
    uploadedAt: '2024-01-13T09:15:00Z',
    thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400',
    link: 'https://github.com/alex/nodejs-api',
    likes: 31,
    views: 203
  },
  {
    _id: '4',
    title: 'Full-Stack Task Manager',
    description: 'Complete task management application with real-time updates, user authentication, and responsive design.',
    techStack: ['React', 'Node.js', 'Socket.io', 'PostgreSQL'],
    section: 'fullstack',
    author: 'Emily Davis',
    uploadedAt: '2024-01-12T16:45:00Z',
    thumbnail: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400',
    link: 'https://github.com/emily/task-manager',
    likes: 42,
    views: 278
  }
];

// Local storage keys
const STORAGE_KEYS = {
  PROJECTS: 'projects'
};

// Initialize local storage with mock data
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(mockProjects));
  }
};

// Helper function to get data from localStorage
const getFromStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
};

// Helper function to save data to localStorage
const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Initialize storage on module load
initializeStorage();

// Projects API calls (mock)
export const projectsAPI = {
  // Get all projects
  getAll: async (params = {}) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    let projects = getFromStorage(STORAGE_KEYS.PROJECTS);
    
    // Apply filters if provided
    if (params.section) {
      projects = projects.filter(p => p.section === params.section);
    }
    
    return {
      success: true,
      data: projects
    };
  },

  // Get project by ID
  getById: async (id) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const projects = getFromStorage(STORAGE_KEYS.PROJECTS);
    const project = projects.find(p => p._id === id);
    
    if (!project) {
      throw new Error('Project not found');
    }
    
    return {
      success: true,
      data: project
    };
  },

  // Create new project
  create: async (projectData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const projects = getFromStorage(STORAGE_KEYS.PROJECTS);
    
    const newProject = {
      _id: Date.now().toString(),
      ...projectData,
      author: 'Anonymous Developer',
      uploadedAt: new Date().toISOString(),
      likes: 0,
      views: 0
    };
    
    projects.unshift(newProject);
    saveToStorage(STORAGE_KEYS.PROJECTS, projects);
    
    return {
      success: true,
      data: newProject
    };
  },

  // Update project
  update: async (id, projectData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const projects = getFromStorage(STORAGE_KEYS.PROJECTS);
    const projectIndex = projects.findIndex(p => p._id === id);
    
    if (projectIndex === -1) {
      throw new Error('Project not found');
    }
    
    projects[projectIndex] = { ...projects[projectIndex], ...projectData };
    saveToStorage(STORAGE_KEYS.PROJECTS, projects);
    
    return {
      success: true,
      data: projects[projectIndex]
    };
  },

  // Delete project
  delete: async (id) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const projects = getFromStorage(STORAGE_KEYS.PROJECTS);
    const filteredProjects = projects.filter(p => p._id !== id);
    saveToStorage(STORAGE_KEYS.PROJECTS, filteredProjects);
    
    return { success: true };
  },

  // Like/unlike project
  like: async (id) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const projects = getFromStorage(STORAGE_KEYS.PROJECTS);
    const projectIndex = projects.findIndex(p => p._id === id);
    
    if (projectIndex !== -1) {
      projects[projectIndex].likes += 1;
      saveToStorage(STORAGE_KEYS.PROJECTS, projects);
    }
    
    return {
      success: true,
      data: projects[projectIndex]
    };
  },

  // Get projects by section
  getBySection: async (section) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const projects = getFromStorage(STORAGE_KEYS.PROJECTS);
    const filteredProjects = projects.filter(p => p.section === section);
    
    return {
      success: true,
      data: filteredProjects
    };
  }
};

// Upload API calls (mock)
export const uploadAPI = {
  // Upload single file
  single: async (file) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create a mock file URL
    const mockFileUrl = URL.createObjectURL(file);
    
    return {
      success: true,
      data: {
        filename: file.name,
        url: mockFileUrl,
        size: file.size,
        type: file.type
      }
    };
  },

  // Upload multiple files
  multiple: async (files) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const uploadedFiles = Array.from(files).map(file => ({
      filename: file.name,
      url: URL.createObjectURL(file),
      size: file.size,
      type: file.type
    }));
    
    return {
      success: true,
      data: uploadedFiles
    };
  },

  // Get file info
  getFileInfo: async (filename) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      success: true,
      data: {
        filename,
        url: `https://example.com/files/${filename}`,
        size: 1024,
        type: 'image/png'
      }
    };
  },

  // Delete file
  delete: async (filename) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return { success: true };
  }
};

export default {
  projects: projectsAPI,
  upload: uploadAPI
};