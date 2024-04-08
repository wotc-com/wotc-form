import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { vanillaCells, vanillaRenderers } from '@jsonforms/vanilla-renderers';
import { useQuery } from '@tanstack/react-query';
import fetch from 'cross-fetch';
import { IWotcConfig } from '../components/WotcFormInstance';
import { buildPath } from './buildPath';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import md5 from 'crypto-js/md5';

export const useFormData = (config: Partial<IWotcConfig>) => {
  const signature = HmacSHA256(JSON.stringify(data), md5(config.entityId + ":" + config.formId).toString());
  const url = config.demo === '1' ? '/jsonform.json' : buildPath([config.baseUrl, 'forms', config.entityId, config.formId]);
  return useQuery({
    queryKey: ['form-data'],
    queryFn: async () => {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Signature": signature.toString(),
        },
      });

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
