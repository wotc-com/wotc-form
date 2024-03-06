import { createAjv } from '@jsonforms/core';
import { JsonForms } from '@jsonforms/react';
import { JsonFormsStyleContext } from '@jsonforms/vanilla-renderers';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState } from 'react';
import { useFormData } from '../utils/useFormData';

const ajvInstance = createAjv();

export const WotcFormInner = ({ defaults = {}, data: _data = {} }: { defaults: Record<string, unknown>; data: Record<string, unknown> }) => {
  const debug = new URLSearchParams(document.location.search).has('debug');
  const config = useFormData();
  const [output, setOutput] = useState({});
  const [data, setData] = useState({ ...defaults, ..._data });
  const onChange = ({ errors, data }) => {
    setData(data);
    setOutput({ data, errors });
  };
  const styles = [];

  if (config.isSuccess) {
    // NOTE: JsonForms requires parent div!
    return (
      <div>
        <JsonFormsStyleContext.Provider value={{ styles }}>
          <JsonForms ajv={ajvInstance} {...config.data} data={data} onChange={onChange} />
        </JsonFormsStyleContext.Provider>
        {debug ? <pre>{JSON.stringify(output, null, 2)}</pre> : null}
      </div>
    );
  }

  if (config.isError) {
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
