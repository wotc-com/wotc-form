import { createAjv } from '@jsonforms/core';
import { JsonForms } from '@jsonforms/react';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState } from 'react';
import { useFormData } from '../utils/useFormData';

export const WotcFormInner = (_props) => {
  const ajvInstance = createAjv();
  const debug = new URLSearchParams(document.location.search).has('debug');
  const data = useFormData();
  const [output, setOutput] = useState(null);
  const onChange = ({ errors, data }) => setOutput({ data, errors });

  if (data.isSuccess) {
    // NOTE: JsonForms requires parent container!
    return (
      <div>
        <JsonForms ajv={ajvInstance} data={null} {...data.data} onChange={onChange} />
        {debug ? <pre>{JSON.stringify(output, null, 2)}</pre> : null}
      </div>
    );
  }

  if (data.isError) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
        <h3>There was an issue loading the form. Please refresh your browser. Thanks.</h3>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
      <CircularProgress />
    </div>
  );
};