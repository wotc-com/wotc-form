import '../styles/index.scss';
import $ from 'jquery';
import { createRoot } from 'react-dom/client';
import wotcFields from './wotc.js';

import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';

import { person } from '@jsonforms/examples';
import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';

var schema = person.schema;
var uischema = person.uischema;
const initialData = person.data;

function WotcForm({options}) {
	
	console.log(schema);
	console.log(uischema);
	
  const [data, setData] = useState(options.data || {});
  return (
	
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
	
  );
  
}

export function init(elementId, options) {
	const rootElement = document.getElementById(elementId || 'wotc-form');
	
	if (!rootElement) return;
	const root = createRoot(rootElement);
	$.get('http://localhost/api/v1/589423844/wotc-form').done(function(res) {
		uischema = res.uischema;
		schema = res.schema;
		root.render(<WotcForm options={options} />);
	});
	
};

export default WotcForm;

$(function() {
	init();
});