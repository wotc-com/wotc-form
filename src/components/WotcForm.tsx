/*

The purpose of this script is to inject an iframe 
on a 3rd party website that displays swellcast.com/widget.

*/
import { debounce } from 'lodash';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { urlSearchParamsToObject } from '../utils/urlSearchParamsToObject';
import { WotcFormInstance } from './WotcFormInstance';

const widgetClass = 'wotc-form-widget';
const widgetClassRendered = widgetClass + '-rendered';

const renderWidgets = debounce(() => {
  let $targets: NodeListOf<HTMLDivElement>;
  $targets = document.querySelectorAll(`.${widgetClass}:not(.${widgetClassRendered})`);
  console.log($targets);
  $targets.forEach(renderWidget);
}, 300);

const renderWidget = ($el: HTMLDivElement) => {
  if ($el) {
    const config = $el.dataset.config;
    let params = {};
    if (config) {
      params = urlSearchParamsToObject(new URLSearchParams(config));
    }
    createRoot($el).render(<WotcFormInstance {...params} />);
  }
};

document.addEventListener('DOMContentLoaded', renderWidgets);
