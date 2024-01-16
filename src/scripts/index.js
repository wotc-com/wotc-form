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

const schema = person.schema;
const uischema = person.uischema;
const initialData = person.data;

function WotcForm(options) {

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
	const root = createRoot(document.getElementById(elementId || 'wotc-form'));
	root.render(<WotcForm options={options} />);
};

export default WotcForm;

$(function() {
	init();
});