import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const GeographicHeatMap = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const regions = [
    {
      id: 1,
      name: 'Downtown District',
      donations: 145,
      recipients: 89,
      coverage: 'high',
      coordinates: { lat: 40.7589, lng: -73.9851 },
      color: '#27AE60'
    },
    {
      id: 2,
      name: 'Suburban North',
      donations: 67,
      recipients: 34,
      coverage: 'medium',
      coordinates: { lat: 40.7831, lng: -73.9712 },
      color: '#F39C12'
    },
    {
      id: 3,
      name: 'East Side',
      donations: 23,
      recipients: 78,
      coverage: 'low',
      coordinates: { lat: 40.7505, lng: -73.9934 },
      color: '#E74C3C'
    },
    {
      id: 4,
      name: 'West End',
      donations: 98,
      recipients: 56,
      coverage: 'high',
      coordinates: { lat: 40.7614, lng: -73.9776 },
      color: '#27AE60'
    },
    {
      id: 5,
      name: 'Industrial Zone',
      donations: 12,
      recipients: 45,
      coverage: 'critical',
      coordinates: { lat: 40.7282, lng: -73.9942 },
      color: '#8E44AD'
    }
  ];

  const getCoverageIcon = (coverage) => {
    switch (coverage) {
      case 'high':
        return 'CheckCircle';
      case 'medium':
        return 'AlertCircle';
      case 'low':
        return 'AlertTriangle';
      case 'critical':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getCoverageColor = (coverage) => {
    switch (coverage) {
      case 'high':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-error';
      case 'critical':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-1 border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Geographic Distribution</h3>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="Download" size={16} />
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="Maximize2" size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Section */}
          <div className="relative">
            <div className="w-full h-80 bg-muted rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Food Distribution Heat Map"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=40.7589,-73.9851&z=12&output=embed"
                className="border-0"
              />
            </div>
            
            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-3 shadow-elevation-2">
              <h4 className="text-sm font-medium text-foreground mb-2">Coverage Level</h4>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span className="text-xs text-muted-foreground">High Coverage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <span className="text-xs text-muted-foreground">Medium Coverage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-error"></div>
                  <span className="text-xs text-muted-foreground">Low Coverage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <span className="text-xs text-muted-foreground">Critical Need</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Region Statistics */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground mb-3">Regional Analysis</h4>
            {regions?.map((region) => (
              <div
                key={region?.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedRegion === region?.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedRegion(selectedRegion === region?.id ? null : region?.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getCoverageIcon(region?.coverage)} 
                      size={16} 
                      className={getCoverageColor(region?.coverage)} 
                    />
                    <span className="font-medium text-foreground">{region?.name}</span>
                  </div>
                  <span className={`text-xs font-medium capitalize ${getCoverageColor(region?.coverage)}`}>
                    {region?.coverage}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Donations:</span>
                    <span className="ml-2 font-medium text-foreground">{region?.donations}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Recipients:</span>
                    <span className="ml-2 font-medium text-foreground">{region?.recipients}</span>
                  </div>
                </div>
                
                {selectedRegion === region?.id && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Supply/Demand Ratio:</span>
                      <span className="font-medium text-foreground">
                        {(region?.donations / region?.recipients)?.toFixed(2)}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: `${Math.min((region?.donations / region?.recipients) * 50, 100)}%`,
                            backgroundColor: region?.color
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographicHeatMap;