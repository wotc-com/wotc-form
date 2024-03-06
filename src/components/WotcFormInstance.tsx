import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { WotcFormInner } from './WotcFormInner';

export const WotcFormInstance = (props) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <WotcFormInner {...props} />
    </QueryClientProvider>
  );
};
