import React, { useState } from 'react';
import { ExternalLink, Github, Play, Eye, Heart, Calendar, User, Code, Palette, Database, Globe } from 'lucide-react';
import ProjectPreview from './ProjectPreview';

const ProjectCard = ({ project }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getSectionIcon = () => {
    switch (project.section) {
      case 'uiux':
        return <Palette className="w-4 h-4" />;
      case 'frontend':
        return <Code className="w-4 h-4" />;
      case 'backend':
        return <Database className="w-4 h-4" />;
      case 'fullstack':
        return <Globe className="w-4 h-4" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  const getSectionColor = () => {
    switch (project.section) {
      case 'uiux':
        return 'text-pink-600 bg-pink-100';
      case 'frontend':
        return 'text-blue-600 bg-blue-100';
      case 'backend':
        return 'text-green-600 bg-green-100';
      case 'fullstack':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTechStackColor = (tech) => {
    const colors = {
      'React': 'bg-blue-100 text-blue-800',
      'Vue': 'bg-green-100 text-green-800',
      'Angular': 'bg-red-100 text-red-800',
      'Node.js': 'bg-green-100 text-green-800',
      'Python': 'bg-yellow-100 text-yellow-800',
      'TypeScript': 'bg-blue-100 text-blue-800',
      'JavaScript': 'bg-yellow-100 text-yellow-800',
      'Docker': 'bg-blue-100 text-blue-800',
      'MongoDB': 'bg-green-100 text-green-800',
      'PostgreSQL': 'bg-blue-100 text-blue-800',
      'Figma': 'bg-purple-100 text-purple-800',
      'Adobe XD': 'bg-pink-100 text-pink-800',
      'Sketch': 'bg-orange-100 text-orange-800',
      'Design System': 'bg-indigo-100 text-indigo-800',
      'UI/UX': 'bg-pink-100 text-pink-800',
      'Prototyping': 'bg-purple-100 text-purple-800',
    };
    return colors[tech] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
        <div className="relative">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getSectionColor()}`}>
              {getSectionIcon()}
              <span className="capitalize">{project.section === 'uiux' ? 'UI/UX' : project.section}</span>
            </div>
          </div>
          <div className="absolute top-3 right-3">
            {project.type === 'link' ? (
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                <ExternalLink className="w-4 h-4 text-gray-600" />
              </div>
            ) : (
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                <Github className="w-4 h-4 text-gray-600" />
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <button
              onClick={() => setShowPreview(true)}
              className="opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-xl font-medium transition-all duration-300 transform scale-90 group-hover:scale-100 flex items-center space-x-2 shadow-lg"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center text-xs text-gray-500 ml-2">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(project.uploadedAt)}
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-xs font-medium ${getTechStackColor(tech)}`}
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                +{project.techStack.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-500">
                <User className="w-4 h-4 mr-1" />
                <span>{project.author || 'Developer'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center space-x-1 text-sm transition-colors ${
                    isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span>24</span>
                </button>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Eye className="w-4 h-4" />
                  <span>156</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProjectPreview
        project={project}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </>
  );
};

export default ProjectCard;