import '../styles/index.scss';
import $ from 'jquery';
import { createRoot } from 'react-dom/client';

import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';

import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';

var schema;
var uischema;
var rootElementId;

function WotcForm({options}) {
	
	console.log(schema);
	console.log(uischema);
	
  const [data, setData] = useState(options.data || {});
  return (
	<>
	  <JsonForms
		schema={schema}
		uischema={uischema}
		data={data}
		renderers={materialRenderers}
		cells={materialCells}
		onChange={function(e) {
			setData(e.data);
		}}
	  />
	  <button type="submit" className={options.buttonClass}>Submit</button>
	</>
  );
  
}

document.addEventListener('submit', (e) => {
	// Store reference to form to make later code easier to read
	const form = e.target;
	
	$(form).find('input, select, textarea').each(function() {
		$(this).attr('name', $(this).attr('id'));
	});

	$.ajax({
	  type: "POST",
	  url: form.action,
	  data: new FormData(form)
	});

	// Prevent the default form submit
	e.preventDefault();
});

export function init(elementId, options) {
	const rootElement = document.getElementById(elementId || 'wotc-form');
	rootElementId = elementId;
	if (!rootElement) return;
	
	const root = createRoot(rootElement);
	const base = options.baseUrl || 'https://app.wotc.com/api/v1';
	const url = `${base}/${options.groupId}/${options.formId}`;
	$.get(url).done(function(res) {
		rootElement.method = "POST";
		rootElement.action = url;
		uischema = res.uischema;
		schema = res.schema;
		root.render(<WotcForm options={options} />);
		
	});
	
};

export default WotcForm;