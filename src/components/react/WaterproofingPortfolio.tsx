import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { 
  Filter,
  MapPin,
  Calendar,
  DollarSign,
  Shield,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
  Home,
  Building,
  Factory,
  Maximize2,
  Clock,
  User,
  Award
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  location: string;
  neighborhood: string;
  completedDate: string;
  problemType: string;
  solutionType: string;
  propertyType: string;
  costRange: string;
  timeline: string;
  warranty: string;
  beforeImage: string;
  afterImage: string;
  additionalImages: string[];
  description: string;
  challenges: string[];
  solutions: string[];
  customerTestimonial: {
    name: string;
    rating: number;
    comment: string;
    date: string;
  };
  projectManager: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const WaterproofingPortfolio: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    problemType: 'all',
    solutionType: 'all',
    propertyType: 'all',
    neighborhood: 'all'
  });
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [beforeAfterSlider, setBeforeAfterSlider] = useState(50);

  // Mock data - in real app, this would come from API
  const projects: Project[] = [
    {
      id: 'P-001',
      title: 'Complete Exterior Waterproofing',
      location: 'Toronto, ON',
      neighborhood: 'Leslieville',
      completedDate: '2024-08-15',
      problemType: 'foundation-leaks',
      solutionType: 'exterior-waterproofing',
      propertyType: 'residential',
      costRange: '$25,000 - $30,000',
      timeline: '8 days',
      warranty: '25 years',
      beforeImage: '/images/before-exterior-1.webp',
      afterImage: '/images/after-exterior-1.webp',
      additionalImages: [
        '/images/progress-exterior-1.webp',
        '/images/progress-exterior-2.webp',
        '/images/progress-exterior-3.webp'
      ],
      description: 'Victorian-era home experiencing significant foundation leaks during heavy rainfall. Complete exterior excavation and waterproofing with modern membrane system.',
      challenges: [
        'Limited access due to adjacent properties',
        'Heritage home required special care',
        'Multiple utility lines to navigate',
        'Extensive root system removal'
      ],
      solutions: [
        'Custom excavation plan with hand-digging in tight spaces',
        'Heritage-approved restoration materials',
        'Professional utility locates and protection',
        'Complete drainage system upgrade'
      ],
      customerTestimonial: {
        name: 'Sarah & Mike Chen',
        rating: 5,
        comment: 'Exceptional work! Our basement has been completely dry through two major storms. The team was professional and respected our heritage home.',
        date: '2024-08-20'
      },
      projectManager: 'Mike Thompson',
      coordinates: { lat: 43.6666, lng: -79.3389 }
    },
    {
      id: 'P-002',
      title: 'Emergency Sump Pump & Interior Drainage',
      location: 'North York, ON',
      neighborhood: 'Willowdale',
      completedDate: '2024-07-22',
      problemType: 'basement-flooding',
      solutionType: 'interior-waterproofing',
      propertyType: 'residential',
      costRange: '$8,000 - $12,000',
      timeline: '3 days',
      warranty: '10 years pumps, 25 years system',
      beforeImage: '/images/before-interior-1.webp',
      afterImage: '/images/after-interior-1.webp',
      additionalImages: [
        '/images/sump-installation-1.webp',
        '/images/drainage-system-1.webp'
      ],
      description: 'Emergency response to basement flooding. Installed primary and backup sump pumps with complete interior perimeter drainage system.',
      challenges: [
        'Active flooding during installation',
        'Finished basement required careful preservation',
        '48-hour emergency timeline',
        'High water table conditions'
      ],
      solutions: [
        '24/7 emergency pumping during work',
        'Minimal disruption techniques',
        'Expedited installation process',
        'High-capacity dual pump system'
      ],
      customerTestimonial: {
        name: 'Robert Kumar',
        rating: 5,
        comment: 'They saved our home! Responded within 2 hours and had our basement dry in 3 days. Amazing service during our crisis.',
        date: '2024-07-25'
      },
      projectManager: 'Sarah Chen',
      coordinates: { lat: 43.7615, lng: -79.4128 }
    },
    {
      id: 'P-003',
      title: 'Commercial Foundation Underpinning',
      location: 'Mississauga, ON',
      neighborhood: 'Port Credit',
      completedDate: '2024-06-10',
      problemType: 'structural-issues',
      solutionType: 'underpinning',
      propertyType: 'commercial',
      costRange: '$45,000 - $60,000',
      timeline: '12 days',
      warranty: '25 years structural',
      beforeImage: '/images/before-commercial-1.webp',
      afterImage: '/images/after-commercial-1.webp',
      additionalImages: [
        '/images/underpinning-1.webp',
        '/images/underpinning-2.webp',
        '/images/underpinning-3.webp',
        '/images/underpinning-4.webp'
      ],
      description: 'Heritage commercial building requiring foundation lowering and structural reinforcement while maintaining operations.',
      challenges: [
        'Building remained operational during work',
        'Complex structural engineering required',
        'Heritage preservation requirements',
        'Coordination with multiple trades'
      ],
      solutions: [
        'Phased construction to maintain operations',
        'Custom engineered support systems',
        'Heritage-compliant materials and methods',
        'Detailed project coordination plan'
      ],
      customerTestimonial: {
        name: 'Port Credit Properties Ltd.',
        rating: 5,
        comment: 'Professional execution of a complex project. Zero disruption to our tenants and exceeded engineering specifications.',
        date: '2024-06-15'
      },
      projectManager: 'David Park',
      coordinates: { lat: 43.5448, lng: -79.5892 }
    },
    {
      id: 'P-004',
      title: 'Crack Injection & Preventive Sealing',
      location: 'Scarborough, ON',
      neighborhood: 'Agincourt',
      completedDate: '2024-05-18',
      problemType: 'foundation-cracks',
      solutionType: 'crack-injection',
      propertyType: 'residential',
      costRange: '$1,500 - $2,500',
      timeline: '1 day',
      warranty: '25 years',
      beforeImage: '/images/before-crack-1.webp',
      afterImage: '/images/after-crack-1.webp',
      additionalImages: [
        '/images/crack-injection-1.webp'
      ],
      description: 'Multiple foundation cracks causing minor water seepage. Polyurethane injection with preventive exterior sealing.',
      challenges: [
        'Multiple crack locations',
        'Varying crack depths',
        'Timing around spring weather',
        'Matching existing foundation finish'
      ],
      solutions: [
        'Comprehensive crack mapping',
        'Multi-depth injection technique',
        'Weather-appropriate materials',
        'Custom color matching'
      ],
      customerTestimonial: {
        name: 'Maria Santos',
        rating: 4,
        comment: 'Quick and effective solution. No more water seepage and the repairs are completely invisible.',
        date: '2024-05-20'
      },
      projectManager: 'Lisa Rodriguez',
      coordinates: { lat: 43.7764, lng: -79.2620 }
    }
  ];

  const filterOptions = {
    problemType: [
      { value: 'all', label: 'All Problems' },
      { value: 'foundation-leaks', label: 'Foundation Leaks' },
      { value: 'basement-flooding', label: 'Basement Flooding' },
      { value: 'foundation-cracks', label: 'Foundation Cracks' },
      { value: 'structural-issues', label: 'Structural Issues' }
    ],
    solutionType: [
      { value: 'all', label: 'All Solutions' },
      { value: 'exterior-waterproofing', label: 'Exterior Waterproofing' },
      { value: 'interior-waterproofing', label: 'Interior Waterproofing' },
      { value: 'crack-injection', label: 'Crack Injection' },
      { value: 'underpinning', label: 'Underpinning' }
    ],
    propertyType: [
      { value: 'all', label: 'All Properties' },
      { value: 'residential', label: 'Residential' },
      { value: 'commercial', label: 'Commercial' },
      { value: 'industrial', label: 'Industrial' }
    ],
    neighborhood: [
      { value: 'all', label: 'All Areas' },
      { value: 'Leslieville', label: 'Leslieville' },
      { value: 'Willowdale', label: 'Willowdale' },
      { value: 'Port Credit', label: 'Port Credit' },
      { value: 'Agincourt', label: 'Agincourt' }
    ]
  };

  const filteredProjects = projects.filter(project => {
    return (
      (selectedFilters.problemType === 'all' || project.problemType === selectedFilters.problemType) &&
      (selectedFilters.solutionType === 'all' || project.solutionType === selectedFilters.solutionType) &&
      (selectedFilters.propertyType === 'all' || project.propertyType === selectedFilters.propertyType) &&
      (selectedFilters.neighborhood === 'all' || project.neighborhood === selectedFilters.neighborhood)
    );
  });

  const updateFilter = (filterType: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const getPropertyIcon = (type: string) => {
    switch (type) {
      case 'commercial': return <Building className="w-4 h-4" />;
      case 'industrial': return <Factory className="w-4 h-4" />;
      default: return <Home className="w-4 h-4" />;
    }
  };

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
    setShowBeforeAfter(false);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      const totalImages = selectedProject.additionalImages.length + 2; // +2 for before/after
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      const totalImages = selectedProject.additionalImages.length + 2;
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }
  };

  const getCurrentImage = () => {
    if (!selectedProject) return '';
    if (currentImageIndex === 0) return selectedProject.beforeImage;
    if (currentImageIndex === 1) return selectedProject.afterImage;
    return selectedProject.additionalImages[currentImageIndex - 2];
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-amber-500 fill-current' : 'text-slate-300'}`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Project Portfolio
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore our completed waterproofing projects across the GTA. See before and after results, 
            customer testimonials, and detailed project information.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {Object.entries(filterOptions).map(([filterType, options]) => (
              <div key={filterType} className="relative">
                <select
                  value={selectedFilters[filterType as keyof typeof selectedFilters]}
                  onChange={(e) => updateFilter(filterType, e.target.value)}
                  className="appearance-none bg-white border border-slate-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            ))}
          </div>
          
          {filteredProjects.length !== projects.length && (
            <div className="text-center mt-4">
              <span className="text-sm text-slate-600">
                Showing {filteredProjects.length} of {projects.length} projects
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFilters({
                  problemType: 'all',
                  solutionType: 'all',
                  propertyType: 'all',
                  neighborhood: 'all'
                })}
                className="ml-2 text-cyan-600"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="relative">
                {/* Before/After Images */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent transition-all duration-500 group-hover:from-transparent group-hover:via-white/20 group-hover:to-transparent"
                    style={{
                      background: `linear-gradient(90deg, 
                        transparent 0%, 
                        transparent 49%, 
                        white 50%, 
                        white 51%, 
                        transparent 100%)`
                    }}
                  />
                  <img 
                    src={project.beforeImage} 
                    alt="Before"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <img 
                    src={project.afterImage} 
                    alt="After"
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:opacity-0"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    Hover for Before
                  </div>
                </div>
                
                <div className="absolute top-4 left-4">
                  <span className="bg-cyan-600 text-white text-xs font-medium px-2 py-1 rounded">
                    {project.solutionType.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </span>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span>{project.neighborhood}, {project.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span>Completed {new Date(project.completedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    {getPropertyIcon(project.propertyType)}
                    <span className="capitalize">{project.propertyType}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-2 bg-cyan-50 rounded">
                    <div className="text-xs text-slate-600">Timeline</div>
                    <div className="text-sm font-medium text-cyan-600">{project.timeline}</div>
                  </div>
                  <div className="text-center p-2 bg-cyan-50 rounded">
                    <div className="text-xs text-slate-600">Investment</div>
                    <div className="text-sm font-medium text-cyan-600">{project.costRange}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {renderStars(project.customerTestimonial.rating)}
                  </div>
                  <span className="text-sm text-slate-600">
                    by {project.customerTestimonial.name}
                  </span>
                </div>

                <Button 
                  className="w-full"
                  onClick={() => openProjectDetails(project)}
                >
                  View Project Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b z-10 px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">
                  {selectedProject.title}
                </h2>
                <button
                  onClick={closeProjectDetails}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Images Section */}
                  <div>
                    <div className="mb-4">
                      <div className="flex gap-2 mb-2">
                        <Button
                          size="sm"
                          variant={!showBeforeAfter ? "default" : "outline"}
                          onClick={() => setShowBeforeAfter(false)}
                        >
                          Project Gallery
                        </Button>
                        <Button
                          size="sm"
                          variant={showBeforeAfter ? "default" : "outline"}
                          onClick={() => setShowBeforeAfter(true)}
                        >
                          Before/After Compare
                        </Button>
                      </div>
                    </div>

                    {showBeforeAfter ? (
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                        <img 
                          src={selectedProject.beforeImage}
                          alt="Before"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <img 
                          src={selectedProject.afterImage}
                          alt="After"
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{
                            clipPath: `polygon(${beforeAfterSlider}% 0, 100% 0, 100% 100%, ${beforeAfterSlider}% 100%)`
                          }}
                        />
                        <div className="absolute top-4 left-4 bg-black/70 text-white text-sm px-2 py-1 rounded">
                          Before
                        </div>
                        <div className="absolute top-4 right-4 bg-black/70 text-white text-sm px-2 py-1 rounded">
                          After
                        </div>
                        <div 
                          className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize"
                          style={{ left: `${beforeAfterSlider}%` }}
                        />
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={beforeAfterSlider}
                          onChange={(e) => setBeforeAfterSlider(Number(e.target.value))}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize"
                        />
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="aspect-[4/3] overflow-hidden rounded-lg bg-slate-200">
                          <img 
                            src={getCurrentImage()}
                            alt="Project image"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
                          {[selectedProject.beforeImage, selectedProject.afterImage, ...selectedProject.additionalImages].map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full ${
                                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-3">Project Overview</h3>
                      <p className="text-slate-700 mb-4">{selectedProject.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <MapPin className="w-4 h-4" />
                            <span>{selectedProject.neighborhood}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(selectedProject.completedDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Clock className="w-4 h-4" />
                            <span>{selectedProject.timeline}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <DollarSign className="w-4 h-4" />
                            <span>{selectedProject.costRange}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Shield className="w-4 h-4" />
                            <span>{selectedProject.warranty} warranty</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <User className="w-4 h-4" />
                            <span>{selectedProject.projectManager}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-3">Challenges & Solutions</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-red-800 mb-2">Challenges:</h4>
                          <ul className="space-y-1 text-sm text-red-700">
                            {selectedProject.challenges.map((challenge, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                                {challenge}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-cyan-700 mb-2">Solutions:</h4>
                          <ul className="space-y-1 text-sm text-cyan-700">
                            {selectedProject.solutions.map((solution, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full mt-2 flex-shrink-0" />
                                {solution}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-cyan-50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5 text-cyan-600" />
                        Customer Testimonial
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {renderStars(selectedProject.customerTestimonial.rating)}
                        </div>
                        <span className="text-sm font-medium text-slate-900">
                          {selectedProject.customerTestimonial.name}
                        </span>
                        <span className="text-sm text-slate-500">
                          • {new Date(selectedProject.customerTestimonial.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-slate-700 italic">
                        "{selectedProject.customerTestimonial.comment}"
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Button className="w-full">
                        Get Quote for Similar Project
                      </Button>
                      <Button variant="outline" className="w-full">
                        Schedule Free Consultation
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Map placeholder - in real app, this would show actual project locations */}
        <div className="mt-16">
          <Card className="shadow-lg">
            <CardHeader>
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                Project Locations
              </h3>
              <p className="text-slate-600">
                See where we've completed waterproofing projects across the GTA
              </p>
            </CardHeader>
            <CardContent>
              <div className="aspect-[16/9] bg-slate-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-600">Interactive map coming soon</p>
                  <p className="text-sm text-slate-500 mt-1">
                    {projects.length} completed projects across {[...new Set(projects.map(p => p.neighborhood))].length} neighborhoods
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WaterproofingPortfolio;