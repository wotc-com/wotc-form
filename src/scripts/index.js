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

window.$ = $;

const schema = {
  "type": "object",
  "properties": {
	"name": {
	  "type": "string",
	  "minLength": 1
	},
	"description": {
	  "title": "Long Description",
	  "type": "string"
	},
	"done": {
	  "type": "boolean"
	},
	"due_date": {
	  "type": "string",
	  "format": "date"
	},
	"rating": {
	  "type": "integer",
	  "maximum": 5
	},
	"recurrence": {
	  "type": "string",
	  "enum": ["Never", "Daily", "Weekly", "Monthly"]
	},
	"recurrence_interval": {
	  "type": "integer"
	}
  },
  "required": ["name", "due_date"]
};
const uischema = person.uischema;
const initialData = person.data;

function WotcForm() {
  const [data, setData] = useState(initialData);
  return (
	<div className='App'>
	  <JsonForms
		schema={schema}
		//uischema={uischema}
		data={data}
		renderers={materialRenderers}
		cells={materialCells}
		onChange={({ data, errors }) => setData(data)}
	  />
	</div>
  );
}

const root = createRoot(document.getElementById('wotcForm'));
root.render(<WotcForm />);

export default WotcForm;