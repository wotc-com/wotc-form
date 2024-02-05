import '../styles/index.scss';
import $ from 'jquery';
import { createRoot } from 'react-dom/client';

import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { createAjv } from '@jsonforms/core';

const ajvInstance = createAjv({allErrors: true});

require("ajv-errors")(ajvInstance, {singleError: true});

import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';

var schema;
var uischema;
var rootElementId;
var appRoot;

function WotcForm({options}) {
	
  const [data, setData] = useState(options.data || {});
  return (
	<>
	  <JsonForms
	    ajv={ajvInstance}
		schema={schema}
		uischema={uischema}
		data={data}
		renderers={materialRenderers}
		cells={materialCells}
		onChange={({ errors, data }) => {setData(data); console.log(errors);}}
	  />
	  <button type="submit" className={options.buttonClass}>Submit</button>
	</>
  );
  
}

function successfulSubmission(form) {
	$(form).remove();
}

document.addEventListener('submit', (e) => {
	// Store reference to form to make later code easier to read
	const form = e.target;
	
	if (form.id === rootElementId) {
		e.preventDefault();
		$(form).find('input, select, textarea').each(function() {
			$(this).attr('name', $(this).attr('id'));
		});
				
		$.ajax({
			headers: {          
				Accept: "text/json; charset=utf-8",         
				"Content-Type": "text/json; charset=utf-8"   
			  },
			url: form.action,
			type: form.method,
			data: $(form).serializeArray(),
			success: function() {
				successfulSubmission(form);
			},
			error: function(jXhr, status, error) {
				
			}
		});
	
		// Prevent the default form submit
		
		
	}
});

export function init(elementId, options) {
	const rootElement = document.getElementById(elementId || 'wotc-form');
	rootElementId = elementId;
	if (!rootElement) return;
	
	appRoot = createRoot(rootElement);
	const base = options.baseUrl || 'https://app.wotc.com/api/v1';
	const url = `${base}/${options.groupId}/${options.formId}`;
	$.get(url).done(function(res) {
		rootElement.method = "POST";
		rootElement.action = url;
		uischema = res.uischema;
		schema = res.schema;
		appRoot.render(<WotcForm options={options} />);
	});
	
};

export default WotcForm;