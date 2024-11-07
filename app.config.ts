import type { ConfigContext, ExpoConfig } from '@expo/config'
import type { AppIconBadgeConfig } from 'app-icon-badge/types'

import { ClientEnv, Env } from './env'

/**
 * Use ts-node here so we can use TypeScript for our Config Plugins
 * and not have to compile them to JavaScript
 */
require('ts-node/register')

const appIconBadgeConfig: AppIconBadgeConfig = {
  enabled: Env.APP_ENV !== 'production',
  badges: [
    {
      text: Env.APP_ENV,
      type: 'banner',
      color: 'white',
      background: '#E6AA15',
    },
    {
      text: Env.VERSION.toString(),
      type: 'ribbon',
      color: 'white',
      background: '#E6AA15',
    },
  ],
}

/**
 * @param config ExpoConfig coming from the static config app.json if it exists
 *
 * You can read more about Expo's Configuration Resolution Rules here:
 * https://docs.expo.dev/workflow/configuration/#configuration-resolution-rules
 */
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  description: `${Env.NAME} Mobile App`,
  owner: Env.EXPO_ACCOUNT_OWNER,
  scheme: Env.SCHEME,
  slug: 'toml',
  version: Env.VERSION.toString(),
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'light',
  primaryColor: '#2B7E6A',
  newArchEnabled: true,
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
    buildNumber: '1',
    infoPlist: {
      LSApplicationQueriesSchemes: ['itms-apps'],
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#2B7E6A',
    },
    package: Env.PACKAGE,
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    [
      'expo-font',
      {
        fonts: ['./assets/fonts/SpaceMono-Regular.ttf'],
      },
    ],
    'expo-localization',
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#2B7E6A',
      },
    ],
    [
      'expo-build-properties',
      {
        android: {
          minSdkVersion: 29,
        },
        ios: {},
      },
    ],
    ['app-icon-badge', appIconBadgeConfig],
    [
      'expo-image-picker',
      {
        photosPermission: 'The app accesses your photos to let you update the profile picture.',
        cameraPermission: 'The app accesses the camera to capture and update your profile picture.',
        microphonePermission: false,
      },
    ],
    'react-native-edge-to-edge',
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
})
