import { addons } from 'storybook/manager-api';
import {
  defaultConfig,
  type TagBadgeParameters,
} from 'storybook-addon-tag-badges/manager-helpers';
import theme from './theme';

addons.setConfig({
  theme,
  tagBadges: [
    {
      tags: 'stable',
      badge: {
        text: 'Stable',
        style: { backgroundColor: '#a8d5a8', color: '#1f2937' },
        tooltip: 'Production-ready — safe to use.',
      },
    },
    {
      tags: 'rc',
      badge: {
        text: 'RC',
        style: { backgroundColor: '#a8c4e0', color: '#1f2937' },
        tooltip: 'Release candidate — close to stable.',
      },
    },
    {
      tags: 'experimental',
      badge: {
        text: 'Experimental',
        style: { backgroundColor: '#f0e19c', color: '#1f2937' },
        tooltip: 'Exploratory — may never ship as-is.',
      },
    },
    {
      tags: 'beta',
      badge: {
        text: 'Beta',
        style: { backgroundColor: '#f4c89a', color: '#1f2937' },
        tooltip: 'Feature-complete but still stabilising.',
      },
    },
    {
      tags: 'alpha',
      badge: {
        text: 'Alpha',
        style: { backgroundColor: '#e8a8a8', color: '#1f2937' },
        tooltip: 'Early-stage — API is unstable and likely to change.',
      },
    },
    ...defaultConfig,
  ] satisfies TagBadgeParameters,
});
