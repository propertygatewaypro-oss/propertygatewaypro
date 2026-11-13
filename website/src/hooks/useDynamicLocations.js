import { useState, useEffect } from 'react';
import { subscribePropertyLocations } from '../services/propertyService';
import { CHENNAI_LOCATIONS } from '../utils/constants';

/**
 * Custom React hook that subscribes to Firestore properties and dynamically
 * extracts only locations where active properties actually exist.
 * Includes live counts per location and top 5 locations.
 */
export function useDynamicLocations() {
  const [data, setData] = useState({
    locations: CHENNAI_LOCATIONS,
    counts: {},
    topLocations: [],
    totalProperties: 0,
    loading: true
  });

  useEffect(() => {
    const unsubscribe = subscribePropertyLocations((stats) => {
      // If we got valid locations from Firestore, use them; otherwise fallback to default
      const finalLocations = stats.locations && stats.locations.length > 1
        ? stats.locations
        : CHENNAI_LOCATIONS;

      setData({
        locations: finalLocations,
        counts: stats.counts || {},
        topLocations: stats.topLocations || [],
        totalProperties: stats.totalProperties || 0,
        loading: false
      });
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  return data;
}

export default useDynamicLocations;
