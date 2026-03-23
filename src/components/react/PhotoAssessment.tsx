import React, { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface UploadedPhoto {
  id: string;
  file: File;
  preview: string;
  analysis?: DamageAnalysis;
}

interface DamageAnalysis {
  severity: 'Minor' | 'Moderate' | 'Severe' | 'Critical';
  damageType: string;
  confidence: number;
  estimatedCost: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Emergency';
  recommendations: string[];
  description: string;
}

const PhotoAssessment: React.FC = () => {
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/') && photos.length < 5) {
        const id = Math.random().toString(36).substring(7);
        const preview = URL.createObjectURL(file);
        
        const newPhoto: UploadedPhoto = {
          id,
          file,
          preview
        };
        
        setPhotos(prev => [...prev, newPhoto]);
        analyzePhoto(newPhoto);
      }
    });
  };

  const analyzePhoto = async (photo: UploadedPhoto) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic delay and results
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    // Mock AI analysis based on common waterproofing issues
    const analyses: DamageAnalysis[] = [
      {
        severity: 'Moderate',
        damageType: 'Foundation Crack',
        confidence: 87,
        estimatedCost: '$800 - $2,500',
        urgency: 'Medium',
        recommendations: [
          'Schedule foundation inspection within 2 weeks',
          'Monitor for water seepage during next rainfall',
          'Consider professional crack injection repair'
        ],
        description: 'Horizontal foundation crack detected with potential for water infiltration. Crack appears to be settling-related rather than structural.'
      },
      {
        severity: 'Severe',
        damageType: 'Active Water Infiltration',
        confidence: 94,
        estimatedCost: '$3,500 - $8,000',
        urgency: 'High',
        recommendations: [
          'Contact waterproofing contractor within 48 hours',
          'Install temporary drainage if possible',
          'Document damage for insurance purposes',
          'Consider exterior excavation and waterproofing'
        ],
        description: 'Active water intrusion visible with mineral deposits indicating ongoing seepage. Requires immediate professional assessment.'
      },
      {
        severity: 'Critical',
        damageType: 'Structural Foundation Damage',
        confidence: 91,
        estimatedCost: '$8,000 - $15,000+',
        urgency: 'Emergency',
        recommendations: [
          'Contact structural engineer immediately',
          'Avoid disturbing foundation area',
          'Emergency waterproofing consultation required',
          'Document all visible damage'
        ],
        description: 'Significant foundation displacement with active water intrusion. Potential structural integrity concerns requiring emergency professional evaluation.'
      },
      {
        severity: 'Minor',
        damageType: 'Surface Moisture',
        confidence: 78,
        estimatedCost: '$500 - $1,500',
        urgency: 'Low',
        recommendations: [
          'Improve ventilation in basement area',
          'Consider dehumidifier installation',
          'Monitor for mold development',
          'Inspect during humid weather'
        ],
        description: 'Surface condensation with minor water staining. Likely humidity-related rather than infiltration. Preventive measures recommended.'
      },
      {
        severity: 'Moderate',
        damageType: 'Basement Wall Seepage',
        confidence: 85,
        estimatedCost: '$2,000 - $5,000',
        urgency: 'Medium',
        recommendations: [
          'Schedule professional assessment',
          'Check exterior grading and drainage',
          'Consider interior drainage system',
          'Monitor during heavy rainfall'
        ],
        description: 'Wall seepage with efflorescence indicating water penetration through masonry. Interior drainage solution likely required.'
      }
    ];
    
    const randomAnalysis = analyses[Math.floor(Math.random() * analyses.length)];
    
    setPhotos(prev => prev.map(p => 
      p.id === photo.id ? { ...p, analysis: randomAnalysis } : p
    ));
    
    setIsAnalyzing(false);
  };

  const removePhoto = (id: string) => {
    setPhotos(prev => {
      const photo = prev.find(p => p.id === id);
      if (photo) {
        URL.revokeObjectURL(photo.preview);
      }
      return prev.filter(p => p.id !== id);
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Minor': return 'bg-cyan-50 text-cyan-700';
      case 'Moderate': return 'bg-amber-50 text-amber-700';
      case 'Severe': return 'bg-orange-100 text-orange-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Low': return 'bg-cyan-50 text-cyan-700';
      case 'Medium': return 'bg-amber-50 text-amber-700';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Emergency': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getOverallAssessment = () => {
    if (photos.length === 0) return null;
    
    const analyses = photos.filter(p => p.analysis).map(p => p.analysis!);
    if (analyses.length === 0) return null;
    
    const severities = analyses.map(a => a.severity);
    const hasCritical = severities.includes('Critical');
    const hasSevere = severities.includes('Severe');
    const hasModerate = severities.includes('Moderate');
    
    if (hasCritical) {
      return {
        level: 'Critical',
        message: 'Emergency professional consultation required',
        action: 'Contact contractor immediately',
        phone: '437-545-0067'
      };
    } else if (hasSevere) {
      return {
        level: 'Severe',
        message: 'Professional assessment needed within 48 hours',
        action: 'Schedule urgent inspection',
        phone: '437-545-0067'
      };
    } else if (hasModerate) {
      return {
        level: 'Moderate',
        message: 'Professional evaluation recommended within 1-2 weeks',
        action: 'Schedule inspection',
        phone: '437-545-0067'
      };
    } else {
      return {
        level: 'Minor',
        message: 'Preventive measures recommended',
        action: 'Consider consultation',
        phone: '437-545-0067'
      };
    }
  };

  const overallAssessment = getOverallAssessment();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-900">
            AI-Powered Damage Assessment
          </CardTitle>
          <CardDescription>
            Upload photos of your water damage or foundation issues for instant analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-cyan-500 bg-cyan-50' 
                : 'border-slate-300 hover:border-blue-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
            
            <svg
              className="w-16 h-16 text-slate-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            
            <p className="text-lg text-slate-600 mb-2">
              Drop photos here or click to upload
            </p>
            <p className="text-sm text-slate-500 mb-4">
              PNG, JPG up to 10MB each (Max 5 photos)
            </p>
            
            <div className="text-xs text-slate-400">
              <p className="mb-2"><strong>Best photos to upload:</strong></p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left max-w-md mx-auto">
                <div>• Foundation cracks close-up</div>
                <div>• Water stains or damage</div>
                <div>• Overall basement view</div>
                <div>• Exterior foundation issues</div>
                <div>• Sump pump area</div>
                <div>• Any active water intrusion</div>
              </div>
            </div>
          </div>

          {isAnalyzing && (
            <div className="mt-4 p-4 bg-cyan-50 rounded-lg flex items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-600 mr-3"></div>
              <span className="text-cyan-700">Analyzing photos with AI...</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Uploaded Photos */}
      {photos.length > 0 && (
        <div className="grid gap-6">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Photo */}
                <div className="lg:w-1/3">
                  <img
                    src={photo.preview}
                    alt="Damage assessment"
                    className="w-full h-48 lg:h-full object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 p-0"
                    onClick={() => removePhoto(photo.id)}
                  >
                    ✕
                  </Button>
                </div>
                
                {/* Analysis */}
                <div className="lg:w-2/3 p-6">
                  {photo.analysis ? (
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <Badge className={getSeverityColor(photo.analysis.severity)}>
                          {photo.analysis.severity}
                        </Badge>
                        <Badge className={getUrgencyColor(photo.analysis.urgency)}>
                          {photo.analysis.urgency} Priority
                        </Badge>
                        <span className="text-sm text-slate-500">
                          {photo.analysis.confidence}% confidence
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {photo.analysis.damageType}
                      </h3>
                      
                      <p className="text-slate-600 mb-4">
                        {photo.analysis.description}
                      </p>
                      
                      <div className="bg-slate-50 p-4 rounded-lg mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-700">
                            Estimated Cost Range:
                          </span>
                          <span className="text-lg font-bold text-cyan-600">
                            {photo.analysis.estimatedCost}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">
                          Recommendations:
                        </h4>
                        <ul className="space-y-1">
                          {photo.analysis.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-cyan-600 mr-2">•</span>
                              <span className="text-sm text-slate-700">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-32">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600 mx-auto mb-2"></div>
                        <p className="text-slate-600">Analyzing...</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Overall Assessment */}
      {overallAssessment && (
        <Card className="mt-8 border-l-4 border-cyan-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              Overall Assessment
              <Badge className={getSeverityColor(overallAssessment.level)}>
                {overallAssessment.level}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-slate-700 mb-4">
              {overallAssessment.message}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-cyan-600 hover:bg-cyan-700"
                onClick={() => window.open(`tel:${overallAssessment.phone}`, '_self')}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call {overallAssessment.phone}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.open('/free-inspection', '_blank')}
              >
                Schedule Free Inspection
              </Button>
              
              {overallAssessment.level === 'Critical' && (
                <Button
                  variant="destructive"
                  onClick={() => window.open('/emergency', '_blank')}
                >
                  Emergency Service
                </Button>
              )}
            </div>
            
            <div className="mt-6 p-4 bg-cyan-50 rounded-lg">
              <h4 className="font-semibold text-cyan-800 mb-2">Next Steps:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-cyan-700">
                <li>Save this assessment for your records</li>
                <li>Contact our team for professional verification</li>
                <li>Schedule an inspection to confirm findings</li>
                <li>Receive detailed quote for recommended solutions</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-amber-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-amber-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="font-semibold text-amber-700">Important Disclaimer</h4>
            <p className="text-sm text-amber-600 mt-1">
              This AI assessment is for preliminary evaluation only. Professional inspection 
              is required for accurate diagnosis and repair recommendations. Results may vary 
              based on photo quality and lighting conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoAssessment;