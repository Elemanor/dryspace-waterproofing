import yaml from 'js-yaml';
import fs from 'fs';
import merge from 'lodash.merge';

const loadConfig = (configFile) => {
  try {
    const content = fs.readFileSync(configFile, 'utf8');
    return yaml.load(content);
  } catch (e) {
    console.error(`Error loading config from ${configFile}:`, e);
    return {};
  }
};

export default function astrowind(opts = {}) {
  const defaultConfigFile = './src/config.yaml';
  const configFile = opts.config || defaultConfigFile;

  return {
    name: 'astrowind',
    hooks: {
      'astro:config:setup': ({ config, injectScript }) => {
        const astrowindConfig = loadConfig(configFile);
        
        config.site = config.site || astrowindConfig.site?.site;
        
        if (astrowindConfig.analytics?.vendors?.googleAnalytics?.id) {
          const ga4Id = astrowindConfig.analytics.vendors.googleAnalytics.id;
          injectScript(
            'head-inline',
            `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ga4Id}');
            `
          );
        }
      },
    },
  };
}