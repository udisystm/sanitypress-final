'use client'
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

interface GoogleTagManagerProps {
  gtmId: string; // Type annotation for the gtmId prop
}

const GoogleTagManager: React.FC<GoogleTagManagerProps> = ({ gtmId }) => {
  useEffect(() => {
    if (gtmId) {
      TagManager.initialize({ gtmId });
    }
  }, [gtmId]);

  return null; // This component does not render anything in the DOM
};

export default GoogleTagManager;
