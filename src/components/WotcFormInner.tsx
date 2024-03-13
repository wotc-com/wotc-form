import { JsonFormsCore, createAjv } from '@jsonforms/core';
import { JsonForms } from '@jsonforms/react';
import { JsonFormsStyleContext } from '@jsonforms/vanilla-renderers';
import { Box, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useMutation } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { buildPath } from '../utils/buildPath';
import { useFormData } from '../utils/useFormData';
import { IWotcConfig } from './WotcFormInstance';

const ajvInstance = createAjv();

interface IFormData extends Partial<JsonFormsCore> {
  data: Partial<{
    screening: Record<string, boolean>;
    personal: {
      name: string;
      email: string;
      phone: string;
      address_street: string;
      address_city: string;
      address_postcode: string;
      address_state: string;
      mobile_phone: string;
      dob: string;
      ssn: string;
    };
  }>;
}

export const WotcFormInner = ({ config: config }: { config: Partial<IWotcConfig> }) => {
  const debug = new URLSearchParams(document.location.search).has('debug');
  const formData = useFormData(config);
  const [output, setOutput] = useState<IFormData>({ data: { ...(config?.defaults ?? {}), ...(config?.data ?? {}) }, errors: [] });
  const styles = [];
  
  const formAction = useMemo(() => buildPath([config.baseUrl, 'forms', config.entityId, config.integration, config.submission_queue]), [config]);

  const showSubmit = useMemo(() => {
    const hasErrors = (output?.errors ?? []).length > 0;
    const hasPersonalInfo = JSON.stringify(output?.data?.personal ?? {}).length > 30;
    return !hasErrors && hasPersonalInfo;
  }, [output]);

  const mutation = useMutation<{ message: string }, unknown, unknown>({
    mutationFn: (data: IFormData) => {
      return fetch(formAction, {
        method: 'POST', //
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
      }).then((r) => r.json());
    }
  });

  const onChange = (delta: IFormData) => setOutput(delta);

  const onSubmit = () => mutation.mutate(output.data);

  if (mutation.isPending) {
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
      <CircularProgress />
    </div>;
  }

  if (mutation.isSuccess) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
        <h3>Completed! Thanks.</h3>
        <p>{mutation.data?.message ?? ''}</p>
      </div>
    );
  }

  if (formData.isSuccess) {
    // NOTE: JsonForms requires parent div!
    return (
      <div style={{ position: 'relative' }}>
        <div>
          <JsonFormsStyleContext.Provider value={{ styles }}>
            <JsonForms
              ajv={ajvInstance} //
              {...formData.data}
              data={output.data}
              onChange={onChange}
              validationMode='ValidateAndShow'
              onSubmit={() => console.log('submit')}
            />
            {showSubmit ? (
              <Box>
                <Button fullWidth variant='contained' onClick={onSubmit}>
                  Submit
                </Button>
              </Box>
            ) : null}
          </JsonFormsStyleContext.Provider>
        </div>

        {mutation.isError ? (
          <div
            style={{
              position: 'absolute', //
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 400,
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.2)',
              backdropFilter: 'blur(3px) brightness(110%)',
              zIndex: 9999999
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
              <div style={{ maxWidth: 400, textAlign: 'center' }}>
                <h3>There was an issue submitting the form.</h3>
                <h4>Please try again.</h4>
                <Button variant='contained' onClick={() => mutation.reset()}>
                  OK
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        {debug ? <pre>{JSON.stringify({ showSubmit, config, output, formAction }, null, 2)}</pre> : null}
      </div>
    );
  }

  if (formData.isError) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
        <div style={{ textAlign: 'center' }}>
          <h3>
            There was an issue loading the form. <br /> Please refresh your browser.
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
      <CircularProgress />
    </div>
  );
};
