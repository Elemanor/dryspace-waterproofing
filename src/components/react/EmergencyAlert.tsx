import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Phone, Clock, X } from 'lucide-react';

export default function EmergencyAlert() {
  const [isVisible, setIsVisible] = useState(true);
  const [isPulsing, setIsPulsing] = useState(true);

  useEffect(() => {
    // Stop pulsing after 5 seconds to not be too distracting
    const timer = setTimeout(() => setIsPulsing(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md animate-slide-in-right">
      <Alert className={`border-red-500 bg-red-50 shadow-2xl ${isPulsing ? 'animate-pulse' : ''}`}>
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <AlertTitle className="text-red-900 font-bold mb-2">
                Emergency Water Damage?
              </AlertTitle>
              <AlertDescription className="text-red-800 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="animate-pulse">
                    <Clock className="w-3 h-3 mr-1" />
                    24/7 Service
                  </Badge>
                  <Badge variant="outline" className="text-red-700 border-red-300">
                    {"<60 Minute Response"}
                  </Badge>
                </div>
                <p className="text-sm">
                  Basement flooding? Foundation leaking? Our emergency team is standing by.
                </p>
                <div className="flex gap-2 mt-3">
                  <Button 
                    size="sm" 
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => window.location.href = 'tel:437-545-0067'}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now: 437-545-0067
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-red-700 border-red-300 hover:bg-red-100"
                  >
                    Get Help Online
                  </Button>
                </div>
              </AlertDescription>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-red-400 hover:text-red-600 transition-colors"
            aria-label="Close alert"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </Alert>
    </div>
  );
}

// Floating Emergency Button (Alternative Component)
export function FloatingEmergencyButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <div className="relative">
        {isHovered && (
          <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-white rounded-lg shadow-xl border border-red-200">
            <p className="text-sm font-semibold text-red-900 mb-1">
              Emergency Service Available 24/7
            </p>
            <p className="text-xs text-slate-600">
              Average response: {"<60 minutes"}
            </p>
          </div>
        )}
        <Button
          size="lg"
          className="bg-red-600 hover:bg-red-700 text-white shadow-2xl animate-pulse-slow rounded-full h-16 w-16 p-0"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => window.location.href = 'tel:437-545-0067'}
        >
          <Phone className="w-6 h-6" />
        </Button>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </div>
    </div>
  );
}

// Top Banner Alert (Alternative Component)
export function EmergencyBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <AlertTriangle className="w-5 h-5 animate-pulse" />
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="font-bold">Emergency Water Damage?</span>
            <span className="text-sm opacity-90">
              {"<60 Min Response • Licensed & Insured • WSIB Cleared • Call: 437-545-0067"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="hidden sm:inline-flex"
            onClick={() => window.location.href = 'tel:437-545-0067'}
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Now
          </Button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Close banner"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}