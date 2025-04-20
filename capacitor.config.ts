import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.freshventory.app',
  appName: 'Freshventory',
  webDir: 'dist',
  // Remove deprecated bundledWebRuntime property
  server: {
    androidScheme: 'https'
  }
};

export default config;
