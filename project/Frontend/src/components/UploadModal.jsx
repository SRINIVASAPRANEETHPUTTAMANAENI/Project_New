import React, { useState, useEffect } from 'react';
import { X, Upload, Link, FileText, Image, Code, Palette, Database, Globe, Github } from 'lucide-react';
import { projectsAPI, uploadAPI } from '../services/api';

const UploadModal = ({ isOpen, onClose, onUpload }) => {
  const [selectedSection, setSelectedSection] = useState('');
  const [uploadType, setUploadType] = useState('github');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    link: '',
    githubUrl: '',
    file: null
  });
  const [dragActive, setDragActive] = useState(false);
  const [step, setStep] = useState('section');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysis, setAnalysis] = useState(null);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sections = [
    {
      id: 'uiux',
      label: 'UI/UX Design',
      icon: Palette,
      description: 'Upload design files, mockups, wireframes, or prototypes',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-700'
    },
    {
      id: 'frontend',
      label: 'Frontend Development',
      icon: Code,
      description: 'Share frontend implementations, components, or interfaces',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      id: 'backend',
      label: 'Backend Development',
      icon: Database,
      description: 'Upload APIs, server code, or database implementations',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      id: 'fullstack',
      label: 'Full-Stack Project',
      icon: Globe,
      description: 'Complete applications with frontend and backend',
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    }
  ];

  const handleSectionSelect = (sectionId) => {
    setSelectedSection(sectionId);
    setStep('upload');
  };

  const analyzeGitHubRepo = async (githubUrl) => {
    try {
      setLoading(true);
      // Simulate GitHub repo analysis
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock analysis data
      const mockAnalysis = {
        techStack: {
          frontend: ['React', 'TypeScript', 'Tailwind CSS'],
          backend: ['Node.js', 'Express'],
          database: ['MongoDB'],
          tools: ['Git', 'Docker']
        },
        projectStructure: {
          hasPackageJson: true,
          hasReadme: true,
          hasDockerfile: false
        }
      };
      
      setAnalysis(mockAnalysis);
      // Auto-fill tech stack if detected
      const detectedTech = [
        ...mockAnalysis.techStack.frontend,
        ...mockAnalysis.techStack.backend,
        ...mockAnalysis.techStack.database,
        ...mockAnalysis.techStack.tools
      ];
      if (detectedTech.length > 0) {
        setFormData(prev => ({
          ...prev,
          techStack: detectedTech.join(', ')
        }));
      }
    } catch (err) {
      setError('Failed to analyze GitHub repository');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let uploadedFiles = [];

      // Handle file upload if uploadType is 'file'
      if (uploadType === 'file' && formData.file) {
        const uploadResponse = await uploadAPI.single(formData.file);
        uploadedFiles.push(uploadResponse.data);
      }

      // Prepare project data
      const projectData = {
        title: formData.title,
        description: formData.description,
        techStack: formData.techStack.split(',').map(tech => tech.trim()).filter(Boolean),
        section: selectedSection,
        uploadType: uploadType,
        link: uploadType === 'link' ? formData.link : undefined,
        githubRepo: uploadType === 'github' ? { url: formData.githubUrl } : undefined,
        files: uploadedFiles,
        thumbnail: generateThumbnail(selectedSection),
        detectedTechStack: analysis?.techStack || {},
        projectStructure: analysis?.projectStructure || {}
      };

      // Create project in backend
      const response = await projectsAPI.create(projectData);
      
      // Call the onUpload callback with the created project
      onUpload(response.data);
      handleClose();
    } catch (err) {
      setError(err.message || 'Failed to upload project');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Reset all states
    setStep('section');
    setSelectedSection('');
    setFormData({ title: '', description: '', techStack: '', link: '', githubUrl: '', file: null });
    setError('');
    setLoading(false);
    setAnalysis(null);
    setDragActive(false);
    setUploadType('github');
    
    // Call the parent's onClose function
    onClose();
  };

  const generateThumbnail = (section) => {
    const thumbnails = {
      uiux: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      frontend: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      backend: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400',
      fullstack: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400'
    };
    return thumbnails[section] || thumbnails.frontend;
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData({ ...formData, file: e.dataTransfer.files[0] });
    }
  };

  const getPlaceholderText = () => {
    switch (selectedSection) {
      case 'uiux':
        return 'Figma link, Adobe XD file, or design images...';
      case 'frontend':
        return 'GitHub repository, CodePen, or live demo...';
      case 'backend':
        return 'API documentation, GitHub repo, or server code...';
      case 'fullstack':
        return 'Complete project repository or demo link...';
      default:
        return 'Project link or files...';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {step === 'section' ? 'Choose Section' : 'Upload Project'}
            </h2>
            <p className="text-gray-600 mt-1">
              {step === 'section' 
                ? 'Select the category that best fits your project'
                : `Uploading to ${sections.find(s => s.id === selectedSection)?.label}`
              }
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="button"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {step === 'section' ? (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => handleSectionSelect(section.id)}
                    className={`p-6 rounded-2xl border-2 border-transparent hover:border-gray-300 transition-all duration-300 text-left group hover:shadow-lg ${section.bgColor}`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${section.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-lg font-semibold ${section.textColor} mb-2`}>
                          {section.label}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {section.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <button
                type="button"
                onClick={() => setStep('section')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                ← Back to sections
              </button>
            </div>

            <div className="flex space-x-4 p-1 bg-gray-100 rounded-xl">
              <button
                type="button"
                onClick={() => setUploadType('github')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 ${
                  uploadType === 'github'
                    ? 'bg-white text-blue-600 shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repo</span>
              </button>
              <button
                type="button"
                onClick={() => setUploadType('file')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 ${
                  uploadType === 'file'
                    ? 'bg-white text-blue-600 shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Upload className="w-4 h-4" />
                <span>Upload Files</span>
              </button>
              <button
                type="button"
                onClick={() => setUploadType('link')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 ${
                  uploadType === 'link'
                    ? 'bg-white text-blue-600 shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Link className="w-4 h-4" />
                <span>Add Link</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter project title"
                  required
                />
              </div>

              <div>
                <label htmlFor="techStack" className="block text-sm font-semibold text-gray-700 mb-2">
                  Tech Stack
                </label>
                <input
                  type="text"
                  id="techStack"
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="React, Node.js, TypeScript (comma separated)"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Describe your project..."
                required
              />
            </div>

            {uploadType === 'github' ? (
              <div>
                <label htmlFor="githubUrl" className="block text-sm font-semibold text-gray-700 mb-2">
                  GitHub Repository URL
                </label>
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <Github className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      id="githubUrl"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="https://github.com/username/repository"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => analyzeGitHubRepo(formData.githubUrl)}
                    disabled={!formData.githubUrl || loading}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Analyzing...' : 'Analyze'}
                  </button>
                </div>
                {analysis && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <h4 className="font-semibold text-green-800 mb-2">Repository Analysis</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-green-700"><strong>Frontend:</strong> {analysis.techStack.frontend.join(', ') || 'None detected'}</p>
                        <p className="text-green-700"><strong>Backend:</strong> {analysis.techStack.backend.join(', ') || 'None detected'}</p>
                      </div>
                      <div>
                        <p className="text-green-700"><strong>Database:</strong> {analysis.techStack.database.join(', ') || 'None detected'}</p>
                        <p className="text-green-700"><strong>Tools:</strong> {analysis.techStack.tools.join(', ') || 'None detected'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : uploadType === 'link' ? (
              <div>
                <label htmlFor="link" className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Link
                </label>
                <div className="relative">
                  <Link className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    id="link"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder={getPlaceholderText()}
                    required
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload File
                </label>
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                    dragActive
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {formData.file ? (
                    <div className="flex items-center justify-center space-x-3">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">{formData.file.name}</p>
                        <p className="text-xs text-gray-500">{(formData.file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <Upload className="w-12 h-12 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-gray-600 mb-2">Drag and drop files here, or</p>
                        <label className="text-blue-600 hover:text-blue-700 cursor-pointer font-semibold">
                          browse files
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setFormData({ ...formData, file: e.target.files[0] });
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex space-x-4 pt-6">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Uploading...' : 'Upload Project'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UploadModal;