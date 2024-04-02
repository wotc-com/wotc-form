import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { WotcFormInner } from './WotcFormInner';

export interface IWotcConfig {
  entityId: string;
  formId: string;
  baseUrl: string;
  buttonClass: string;
  defaults: Record<string, unknown>;
  data: Record<string, unknown>;
  //integration: string;
  submission_queue: string;
  demo: string;
}

export const DEFAULT_CONFIG: IWotcConfig = {
  entityId: 'Q7dv2NbwgbpoPDBy',
  formId: 'Q7dv2NbwgbpoPDBy',
  baseUrl: 'https://api.wotc.com/v1',
  buttonClass: 'btn btn-primary',
  defaults: {},
  data: {},
  //integration: '',
  submission_queue: '',
  demo: '1'
};

export const WotcFormInstance = ({ config }: { config: Partial<IWotcConfig> }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <WotcFormInner config={{ ...DEFAULT_CONFIG, ...config }} />
    </QueryClientProvider>
  );
};
