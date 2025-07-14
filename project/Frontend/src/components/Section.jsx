import React, { useState } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import ProjectCard from './ProjectCard';
import UploadModal from './UploadModal';

const Section = ({
  section,
  title,
  description,
  projects
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTech = !selectedTech || project.techStack.includes(selectedTech);
    return matchesSearch && matchesTech;
  });

  const allTechStacks = Array.from(
    new Set(projects.flatMap(project => project.techStack))
  ).sort();

  const getSectionGradient = () => {
    switch (section) {
      case 'uiux':
        return 'from-pink-500 via-rose-500 to-pink-600';
      case 'frontend':
        return 'from-blue-500 via-cyan-500 to-blue-600';
      case 'backend':
        return 'from-green-500 via-emerald-500 to-green-600';
      case 'fullstack':
        return 'from-purple-500 via-indigo-500 to-purple-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getSectionStats = () => {
    return {
      total: projects.length,
      thisWeek: Math.floor(projects.length * 0.3),
      trending: Math.floor(projects.length * 0.2)
    };
  };

  const stats = getSectionStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className={`bg-gradient-to-r ${getSectionGradient()} rounded-3xl p-8 mb-8 text-white relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-3">{title}</h1>
                <p className="text-white/90 text-lg max-w-2xl leading-relaxed mb-6">
                  {description}
                </p>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.total}</div>
                    <div className="text-white/80 text-sm">Total Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.thisWeek}</div>
                    <div className="text-white/80 text-sm">This Week</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.trending}</div>
                    <div className="text-white/80 text-sm">Trending</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="pl-12 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm min-w-[200px] transition-all duration-300"
              >
                <option value="">All Technologies</option>
                {allTechStacks.map(tech => (
                  <option key={tech} value={tech}>{tech}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-xl p-1 border border-gray-300">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'list'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              No projects found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchTerm || selectedTech 
                ? 'Try adjusting your search criteria or filters to find more projects'
                : 'This section is waiting for amazing projects. Be the first to contribute!'
              }
            </p>
            {searchTerm || selectedTech ? (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTech('');
                }}
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                <span>Clear Filters</span>
              </button>
            ) : null}
          </div>
        )}
      </div>
      {/* Upload Modal */}
      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={(project) => {
          setShowUploadModal(false);
          // You may want to call a prop or context to add the project
        }}
      />
    </div>
  );
};

export default Section;