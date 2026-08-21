import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { VitePlugin } from '@electron-forge/plugin-vite';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    name: 'biblia-sagrada',
    executableName: 'biblia-sagrada',
    appBundleId: 'com.bibliasagrada.app',
    appCategoryType: 'public.app-category.reference',
    icon: './assets/icon.png',
    extraResource: [
      './assets/icon.png',
      './assets/icon-16.png',
      './assets/icon-32.png',
      './assets/icon-48.png',
      './assets/icon-128.png',
      './assets/icon-256.png'
    ]
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      name: 'biblia-sagrada',
      setupExe: 'biblia-sagrada-setup.exe',
      setupIcon: './assets/icon.ico'
    }),
    new MakerZIP({}, ['darwin']),
    new MakerDeb({
      options: {
        name: 'biblia-sagrada',
        productName: 'Bíblia Sagrada',
        genericName: 'Bíblia',
        description: 'Aplicativo completo da Bíblia Sagrada King James em Português com recursos de estudo, favoritos, anotações e busca avançada.',
        version: '1.0.0',
        section: 'education',
        priority: 'optional',

        depends: ['libnss3', 'libatk-bridge2.0-0', 'libdrm2', 'libxkbcommon0', 'libxcomposite1', 'libxdamage1', 'libxrandr2', 'libgbm1', 'libxss1', 'libasound2'],
        recommends: ['libnotify4'],
        categories: ['Education'],
        mimeType: ['application/x-biblia-bookmark'],
        icon: './assets/icon.png',
        homepage: 'https://github.com/noejunior792/bibliasagrada',
        maintainer: 'Bíblia Sagrada <bibliasagrada@noejunior.me>',
        bin: 'biblia-sagrada',

      }
    }),
    new MakerRpm({
      options: {
        name: 'biblia-sagrada',
        productName: 'Bíblia Sagrada',
        genericName: 'Bíblia',
        description: 'Aplicativo completo da Bíblia Sagrada King James em Português',
        version: '1.0.0',

        license: 'MIT',
        homepage: 'https://github.com/noejunior792/bibliasagrada',
        categories: ['Education'],
        requires: ['nss', 'atk', 'at-spi2-atk', 'libdrm', 'libxkbcommon', 'libXcomposite', 'libXdamage', 'libXrandr', 'mesa-libgbm', 'libXScrnSaver', 'alsa-lib']
      }
    })
  ],
  publishers: [],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new VitePlugin({
      build: [
        {
          entry: 'src/main.ts',
          config: 'vite.main.config.ts',
          target: 'main',
        },
        {
          entry: 'src/preload.ts',
          config: 'vite.preload.config.ts',
          target: 'preload',
        },

      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.renderer.config.ts',
        },
      ],
    }),
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
      [FuseV1Options.LoadBrowserProcessSpecificV8Snapshot]: false,
    }),
  ],
  buildIdentifier: 'production'
};

export default config;
