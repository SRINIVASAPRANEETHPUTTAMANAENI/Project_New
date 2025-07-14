import React, { useState } from 'react';
import { X, ExternalLink, Github, Download, Heart, Eye, Calendar, User, Code, Palette, Database, Globe } from 'lucide-react';

const ProjectPreview = ({ project, isOpen, onClose }) => {
  if (!isOpen) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getSectionIcon = () => {
    switch (project.section) {
      case 'uiux':
        return <Palette className="w-5 h-5" />;
      case 'frontend':
        return <Code className="w-5 h-5" />;
      case 'backend':
        return <Database className="w-5 h-5" />;
      case 'fullstack':
        return <Globe className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  const getSectionColor = () => {
    switch (project.section) {
      case 'uiux':
        return 'from-pink-500 to-rose-500';
      case 'frontend':
        return 'from-blue-500 to-cyan-500';
      case 'backend':
        return 'from-green-500 to-emerald-500';
      case 'fullstack':
        return 'from-purple-500 to-indigo-500';
      default:
        return 'from-gray-500 to-gray-600';
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

  const getPreviewContent = () => {
    if (project.section === 'uiux') {
      return (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <Palette className="w-16 h-16 text-pink-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Design Preview</h3>
          <p className="text-gray-600 mb-4">This design file can be opened in your preferred design tool</p>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open in Design Tool</span>
            </a>
          )}
        </div>
      );
    }

    // For other sections, show a mock preview
    return (
      <div className="bg-gray-900 rounded-xl p-8 text-center">
        <div className="bg-gray-800 rounded-lg p-6 mb-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-left">
            <div className="text-green-400 text-sm font-mono mb-2">// {project.title}</div>
            <div className="text-blue-400 text-sm font-mono mb-1">function App() {`{`}</div>
            <div className="text-white text-sm font-mono ml-4 mb-1">return (</div>
            <div className="text-yellow-400 text-sm font-mono ml-8 mb-1">&lt;div className="app"&gt;</div>
            <div className="text-white text-sm font-mono ml-12 mb-1">Hello World!</div>
            <div className="text-yellow-400 text-sm font-mono ml-8 mb-1">&lt;/div&gt;</div>
            <div className="text-white text-sm font-mono ml-4 mb-1">);</div>
            <div className="text-blue-400 text-sm font-mono">{`}`}</div>
          </div>
        </div>
        <p className="text-gray-400 mb-4">Live preview of the project</p>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center space-x-2 bg-gradient-to-r ${getSectionColor()} text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300`}
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Live Project</span>
          </a>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-lg"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="absolute bottom-4 left-4">
            <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-white bg-gradient-to-r ${getSectionColor()} shadow-lg`}>
              {getSectionIcon()}
              <span className="font-medium capitalize">
                {project.section === 'uiux' ? 'UI/UX' : project.section}
              </span>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{project.author || 'Developer'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(project.uploadedAt)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-gray-600">
                <Heart className="w-5 h-5" />
                <span>24</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600">
                <Eye className="w-5 h-5" />
                <span>156</span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${getTechStackColor(tech)}`}
              >
                {tech}
              </span>
            ))}
          </div>

          {getPreviewContent()}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors">
                <Heart className="w-5 h-5" />
                <span>Like</span>
              </button>
              {project.file && (
                <button className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 transition-colors">
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                </button>
              )}
            </div>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-2 bg-gradient-to-r ${getSectionColor()} text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium`}
              >
                <ExternalLink className="w-5 h-5" />
                <span>Open Project</span>
              </a>
            )}
          </div>


        </div>
      </div>
    </div>
  );
};

export default ProjectPreview;