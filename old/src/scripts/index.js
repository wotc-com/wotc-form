import '../styles/index.scss';
import $ from 'jquery';
import { createRoot } from 'react-dom/client';

import React, { useState, Button } from 'react';
import { JsonForms } from '@jsonforms/react';
import { createAjv } from '@jsonforms/core';

const ajvInstance = createAjv();

//import AjvErrors from 'ajv-errors';

//AjvErrors(ajvInstance, {singleError: true});

import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';

import {
  JsonFormsStyleContext,
  vanillaCells,
  vanillaRenderers
} from "@jsonforms/vanilla-renderers";

var schema;
var uischema;
var rootElementId;
var appRoot;
var data, setData;
var globalOptions;

function WotcForm({options}) {
  const styleContextValue = {
	styles: options.styles
  };
  const initialData = {
	  ...options.defaults || {},
	  ...options.data || {}
  };
  [data, setData] = useState(initialData);
    
  return (
	<>
	  <JsonFormsStyleContext.Provider value={styleContextValue}>
	  	<JsonForms
	    	ajv={ajvInstance}
			schema={schema}
			uischema={uischema}
			data={data}
			renderers={options.styles == undefined ? materialRenderers : vanillaRenderers}
			cells={options.styles == undefined ? materialCells : vanillaCells}
			onChange={({ errors, data }) => {setData(data); }}
	  	/>
	  </JsonFormsStyleContext.Provider>
	</>
  );
  
}

function successfulSubmission(form) {
	if (globalOptions.onSuccess) {
		globalOptions.onSuccess(form);
	} else {
		$(form).remove();
	}
}

function failedSubmission(error, form) {
	if (globalOptions.onFailure) {
		globalOptions.onFailure(error, form);
	} else {
		alert(error);
	}
}

function sendFormData() {
	const base = globalOptions.baseUrl || 'https://api.wotc.com/v1';
	
	$.ajax({
		headers: {          
			Accept: "text/json; charset=utf-8",         
			"Content-Type": "text/json; charset=utf-8"   
		  },
		url: `${base}/forms/${globalOptions.groupId}/${globalOptions.formId}`,
		type: 'post',
		data: data,
		success: function() {
			successfulSubmission(data);
		},
		error: function(jXhr, status, error) {
			failedSubmission(error, data);
		}
	});
}

export function init(elementId, options) {
	globalOptions = options;
	const rootElement = document.getElementById(elementId || 'wotc-form');
	rootElementId = elementId;
	if (!rootElement) return;
	
	appRoot = createRoot(rootElement);
	const base = options.baseUrl || 'https://api.wotc.com/v1';
	const url = `${base}/forms/${options.groupId}/${options.formId}`;
		
	$.get(url).done(function(res) {
		uischema = res.uischema;
		schema = res.schema;
		options.defaults = res.defaults || {};
		appRoot.render(<WotcForm options={options} />);
	});
	
};

export default WotcForm;