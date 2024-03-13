import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { vanillaCells, vanillaRenderers } from '@jsonforms/vanilla-renderers';
import { useQuery } from '@tanstack/react-query';
import fetch from 'cross-fetch';
import { IWotcConfig } from '../components/WotcFormInstance';
import { buildPath } from './buildPath';

export const useFormData = (config: Partial<IWotcConfig>) => {
  console.log({ config });
  const url = config.demo === '1' ? '/jsonform.json' : buildPath([config.baseUrl, 'forms', config.entityId, config.formId]);
  return useQuery({
    queryKey: ['form-data'],
    queryFn: async () => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const res = await response.json();
      res.cells = res.styles == undefined ? materialCells : vanillaCells;
      res.renderers = res.styles == undefined ? materialRenderers : vanillaRenderers;
      return res;
    }
  });
};
