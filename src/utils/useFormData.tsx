import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { vanillaCells, vanillaRenderers } from '@jsonforms/vanilla-renderers';
import { useQuery } from '@tanstack/react-query';
import fetch from 'cross-fetch';

const fetchData = async () => {
  // TODO: baseUrl should be configurable and default to this
  const response = await fetch(process.env.BASE_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const res = await response.json();
  res.cells = res.styles == undefined ? materialCells : vanillaCells;
  res.renderers = res.styles == undefined ? materialRenderers : vanillaRenderers;
  return res;
};

export const useFormData = () => {
  return useQuery({ queryKey: ['form-data'], queryFn: fetchData });
};
