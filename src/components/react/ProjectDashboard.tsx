import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { 
  Calendar,
  FileText,
  MessageCircle,
  Camera,
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Upload,
  Phone,
  Mail,
  User,
  MapPin,
  DollarSign,
  Wrench,
  Bell,
  Eye
} from 'lucide-react';

interface Project {
  id: string;
  projectName: string;
  address: string;
  startDate: string;
  estimatedCompletion: string;
  status: 'pending' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  projectManager: string;
  totalCost: number;
  paidAmount: number;
  services: string[];
  warranty: {
    years: number;
    expiryDate: string;
    certificateNumber: string;
  };
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  scheduledDate: string;
  completedDate?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
}

interface Document {
  id: string;
  name: string;
  type: 'permit' | 'contract' | 'invoice' | 'warranty' | 'inspection' | 'photo';
  uploadDate: string;
  size: string;
  downloadUrl: string;
}

interface Communication {
  id: string;
  date: string;
  type: 'call' | 'email' | 'site-visit' | 'message';
  subject: string;
  content: string;
  from: string;
  priority: 'low' | 'medium' | 'high';
}

const ProjectDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'documents' | 'communications' | 'warranty'>('overview');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Mock data - in real app, this would come from API
  const project: Project = {
    id: 'SPD-2024-0123',
    projectName: 'Exterior Foundation Waterproofing',
    address: '123 Maple Street, Toronto, ON M4K 1A2',
    startDate: '2024-09-15',
    estimatedCompletion: '2024-09-28',
    status: 'in-progress',
    progress: 65,
    projectManager: 'Mike Thompson',
    totalCost: 32500,
    paidAmount: 16250,
    services: ['Exterior Excavation', 'Membrane Application', 'Weeping Tile Installation', 'Backfill & Restoration'],
    warranty: {
      years: 25,
      expiryDate: '2049-10-01',
      certificateNumber: 'SPD-W-2024-0123'
    }
  };

  const milestones: Milestone[] = [
    {
      id: '1',
      title: 'Permits Approved',
      description: 'City permits received and approved',
      scheduledDate: '2024-09-12',
      completedDate: '2024-09-11',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Utility Locates',
      description: 'All underground utilities marked',
      scheduledDate: '2024-09-14',
      completedDate: '2024-09-13',
      status: 'completed'
    },
    {
      id: '3',
      title: 'Excavation Started',
      description: 'Foundation excavation commenced',
      scheduledDate: '2024-09-15',
      completedDate: '2024-09-15',
      status: 'completed'
    },
    {
      id: '4',
      title: 'Foundation Cleaning',
      description: 'Clean and prep foundation walls',
      scheduledDate: '2024-09-18',
      completedDate: '2024-09-18',
      status: 'completed'
    },
    {
      id: '5',
      title: 'Membrane Application',
      description: 'Apply waterproof membrane to foundation',
      scheduledDate: '2024-09-20',
      status: 'in-progress'
    },
    {
      id: '6',
      title: 'Weeping Tile Installation',
      description: 'Install new drainage system',
      scheduledDate: '2024-09-22',
      status: 'pending'
    },
    {
      id: '7',
      title: 'Backfill & Restoration',
      description: 'Backfill excavation and restore landscaping',
      scheduledDate: '2024-09-26',
      status: 'pending'
    },
    {
      id: '8',
      title: 'Final Inspection',
      description: 'Quality control and final walkthrough',
      scheduledDate: '2024-09-28',
      status: 'pending'
    }
  ];

  const documents: Document[] = [
    {
      id: '1',
      name: 'Building Permit - Foundation Work',
      type: 'permit',
      uploadDate: '2024-09-11',
      size: '2.3 MB',
      downloadUrl: '/documents/permit-foundation.pdf'
    },
    {
      id: '2',
      name: 'Project Contract',
      type: 'contract',
      uploadDate: '2024-09-08',
      size: '1.8 MB',
      downloadUrl: '/documents/contract.pdf'
    },
    {
      id: '3',
      name: 'Initial Invoice - 50% Deposit',
      type: 'invoice',
      uploadDate: '2024-09-08',
      size: '156 KB',
      downloadUrl: '/documents/invoice-001.pdf'
    },
    {
      id: '4',
      name: 'Before Photos - Foundation',
      type: 'photo',
      uploadDate: '2024-09-15',
      size: '15.2 MB',
      downloadUrl: '/photos/before-foundation.zip'
    },
    {
      id: '5',
      name: 'Progress Photos - Day 3',
      type: 'photo',
      uploadDate: '2024-09-18',
      size: '12.8 MB',
      downloadUrl: '/photos/progress-day3.zip'
    },
    {
      id: '6',
      name: 'Pre-excavation Inspection Report',
      type: 'inspection',
      uploadDate: '2024-09-14',
      size: '890 KB',
      downloadUrl: '/documents/inspection-pre.pdf'
    }
  ];

  const communications: Communication[] = [
    {
      id: '1',
      date: '2024-09-19',
      type: 'site-visit',
      subject: 'Progress Review - Day 4',
      content: 'Foundation cleaning completed. Small crack discovered on east wall - will be sealed during membrane application. No impact to timeline.',
      from: 'Mike Thompson - Project Manager',
      priority: 'medium'
    },
    {
      id: '2',
      date: '2024-09-17',
      type: 'call',
      subject: 'Schedule Update',
      content: 'Called to confirm membrane application will begin Wednesday as scheduled. Weather forecast looks good for remainder of week.',
      from: 'Mike Thompson - Project Manager',
      priority: 'low'
    },
    {
      id: '3',
      date: '2024-09-15',
      type: 'message',
      subject: 'Excavation Started',
      content: 'Excavation commenced this morning at 8 AM. Crew found foundation in good condition. Small root system removed near northwest corner.',
      from: 'Installation Team',
      priority: 'medium'
    },
    {
      id: '4',
      date: '2024-09-12',
      type: 'email',
      subject: 'Permits Approved - Ready to Start',
      content: 'Great news! City permits have been approved ahead of schedule. We can begin work as planned on Monday. Utility locates confirmed for Friday.',
      from: 'Sarah Chen - Operations Manager',
      priority: 'high'
    }
  ];

  const progressPhotos = [
    {
      id: '1',
      url: '/images/progress-1.webp',
      date: '2024-09-15',
      description: 'Before excavation - Foundation inspection'
    },
    {
      id: '2',
      url: '/images/progress-2.webp',
      date: '2024-09-16',
      description: 'Excavation in progress - East wall exposed'
    },
    {
      id: '3',
      url: '/images/progress-3.webp',
      date: '2024-09-18',
      description: 'Foundation cleaning completed'
    },
    {
      id: '4',
      url: '/images/progress-4.webp',
      date: '2024-09-20',
      description: 'Membrane application - South wall'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-cyan-600 bg-cyan-50 border-green-200';
      case 'in-progress': return 'text-cyan-600 bg-cyan-50 border-blue-200';
      case 'pending': return 'text-slate-600 bg-slate-50 border-slate-200';
      case 'delayed': return 'text-red-600 bg-red-50 border-red-200';
      case 'on-hold': return 'text-amber-500 bg-amber-50 border-yellow-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'delayed': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-amber-500 bg-amber-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'permit': return <Shield className="w-5 h-5 text-cyan-600" />;
      case 'contract': return <FileText className="w-5 h-5 text-cyan-600" />;
      case 'invoice': return <DollarSign className="w-5 h-5 text-purple-600" />;
      case 'warranty': return <Shield className="w-5 h-5 text-gold-600" />;
      case 'inspection': return <Eye className="w-5 h-5 text-orange-600" />;
      case 'photo': return <Camera className="w-5 h-5 text-pink-600" />;
      default: return <FileText className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Project Dashboard
              </h1>
              <p className="text-slate-600">
                Track your waterproofing project progress and access important documents
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Call Manager
              </Button>
              <Button>
                <Mail className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>

          {/* Project Overview Card */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="md:col-span-2">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {project.projectName}
                  </h3>
                  <p className="text-slate-600 mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {project.address}
                  </p>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)}
                    <span className="ml-2 capitalize">{project.status.replace('-', ' ')}</span>
                  </div>
                </div>
                <div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-600 mb-1">
                      {project.progress}%
                    </div>
                    <div className="text-sm text-slate-600 mb-2">Complete</div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-cyan-600 h-2 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-slate-600">Project ID:</span>
                      <span className="ml-2 font-medium">{project.id}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Manager:</span>
                      <span className="ml-2 font-medium">{project.projectManager}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Completion:</span>
                      <span className="ml-2 font-medium">
                        {new Date(project.estimatedCompletion).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200">
          {[
            { id: 'overview', label: 'Overview', icon: <Wrench className="w-4 h-4" /> },
            { id: 'timeline', label: 'Timeline', icon: <Calendar className="w-4 h-4" /> },
            { id: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4" /> },
            { id: 'communications', label: 'Communications', icon: <MessageCircle className="w-4 h-4" /> },
            { id: 'warranty', label: 'Warranty', icon: <Shield className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-cyan-600 text-cyan-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Services & Progress */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="w-5 h-5" />
                  Services & Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.services.map((service, index) => {
                    const isCompleted = index < 2; // Mock completion
                    const isInProgress = index === 2;
                    return (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                        <div className="flex items-center gap-3">
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-cyan-600" />
                          ) : isInProgress ? (
                            <Clock className="w-5 h-5 text-cyan-600" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-slate-300 rounded-full" />
                          )}
                          <span className="font-medium text-slate-900">{service}</span>
                        </div>
                        <span className={`text-sm px-2 py-1 rounded ${
                          isCompleted ? 'text-cyan-700 bg-cyan-50' :
                          isInProgress ? 'text-cyan-700 bg-cyan-50' :
                          'text-slate-700 bg-slate-100'
                        }`}>
                          {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Pending'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Financial Summary */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Financial Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Total Project Cost:</span>
                    <span className="font-bold text-lg">${project.totalCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-cyan-50 rounded-lg">
                    <span className="text-slate-600">Amount Paid:</span>
                    <span className="font-bold text-lg text-cyan-700">${project.paidAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-slate-600">Remaining Balance:</span>
                    <span className="font-bold text-lg text-orange-700">
                      ${(project.totalCost - project.paidAmount).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm text-slate-600">
                    Final payment due upon project completion
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Photos */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Progress Photos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {progressPhotos.map((photo) => (
                      <div key={photo.id} className="cursor-pointer group" onClick={() => setSelectedPhoto(photo.url)}>
                        <div className="aspect-square bg-slate-200 rounded-lg overflow-hidden mb-2 group-hover:opacity-80 transition-opacity">
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                            <Camera className="w-8 h-8 text-cyan-600" />
                          </div>
                        </div>
                        <div className="text-xs text-slate-600 text-center">
                          <div>{photo.date}</div>
                          <div className="font-medium text-slate-900">{photo.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Project Timeline & Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={milestone.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`p-2 rounded-full border-2 ${getStatusColor(milestone.status)}`}>
                        {getStatusIcon(milestone.status)}
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-0.5 h-12 bg-slate-200 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-slate-900">{milestone.title}</h4>
                        <span className="text-sm text-slate-500">
                          {milestone.completedDate || milestone.scheduledDate}
                        </span>
                      </div>
                      <p className="text-slate-600 mb-2">{milestone.description}</p>
                      <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(milestone.status)}`}>
                        <span className="capitalize">{milestone.status.replace('-', ' ')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'documents' && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Project Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
                    <div className="flex items-center gap-3">
                      {getDocumentIcon(doc.type)}
                      <div>
                        <h4 className="font-medium text-slate-900">{doc.name}</h4>
                        <p className="text-sm text-slate-600">
                          {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)} • {doc.size} • {doc.uploadDate}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
                
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <h4 className="text-lg font-medium text-slate-900 mb-1">Upload Documents</h4>
                  <p className="text-slate-600 mb-4">Share photos, documents, or questions with your project team</p>
                  <Button variant="outline">
                    Choose Files
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'communications' && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Communications Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communications.map((comm) => (
                  <div key={comm.id} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        {comm.type === 'call' && <Phone className="w-4 h-4 text-cyan-600" />}
                        {comm.type === 'email' && <Mail className="w-4 h-4 text-cyan-600" />}
                        {comm.type === 'site-visit' && <User className="w-4 h-4 text-purple-600" />}
                        {comm.type === 'message' && <MessageCircle className="w-4 h-4 text-orange-600" />}
                        <h4 className="font-medium text-slate-900">{comm.subject}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(comm.priority)}`}>
                          {comm.priority}
                        </span>
                        <span className="text-sm text-slate-500">{comm.date}</span>
                      </div>
                    </div>
                    <p className="text-slate-700 mb-2">{comm.content}</p>
                    <p className="text-sm text-slate-500">From: {comm.from}</p>
                  </div>
                ))}
                
                <div className="mt-6">
                  <Button className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message to Project Team
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'warranty' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Warranty Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <Shield className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      {project.warranty.years}-Year Warranty
                    </h3>
                    <p className="text-slate-600">
                      Comprehensive coverage for materials and workmanship
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Certificate Number:</span>
                      <span className="font-medium">{project.warranty.certificateNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Warranty Start Date:</span>
                      <span className="font-medium">Upon Project Completion</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Warranty Expires:</span>
                      <span className="font-medium">{new Date(project.warranty.expiryDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Transferable:</span>
                      <span className="font-medium text-cyan-600">Yes</span>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-800 mb-2">Warranty Coverage Includes:</h4>
                    <ul className="space-y-1 text-sm text-amber-700">
                      <li>• Foundation waterproofing materials</li>
                      <li>• Installation workmanship</li>
                      <li>• Drainage system components</li>
                      <li>• Membrane integrity</li>
                      <li>• Sump pump systems (separate warranty)</li>
                    </ul>
                  </div>

                  <Button className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Warranty Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Maintenance Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-cyan-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Bell className="w-4 h-4 text-cyan-600" />
                      <span className="font-medium text-cyan-800">Upcoming: 6-Month Inspection</span>
                    </div>
                    <p className="text-sm text-cyan-700">
                      Scheduled for March 2025. We'll inspect the waterproofing system and provide a maintenance report.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-cyan-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                      <span className="font-medium text-cyan-800">Completed: 30-Day Follow-up</span>
                    </div>
                    <p className="text-sm text-cyan-700">
                      Initial post-installation inspection completed successfully. All systems functioning properly.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-900">Maintenance Tips:</h4>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Keep foundation drainage areas clear</li>
                      <li>• Test sump pump monthly</li>
                      <li>• Monitor basement humidity levels</li>
                      <li>• Report any water issues immediately</li>
                      <li>• Annual professional inspection recommended</li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold text-slate-900 mb-2">Need Service?</h4>
                    <div className="space-y-2">
                      <Button className="w-full" size="sm">
                        Schedule Maintenance Visit
                      </Button>
                      <Button className="w-full" variant="outline" size="sm">
                        Report Warranty Issue
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDashboard;