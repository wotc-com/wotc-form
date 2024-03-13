/*

The purpose of this script is to inject an iframe 
on a 3rd party website that displays swellcast.com/widget.

*/
import { debounce } from 'lodash';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { WotcFormInstance } from './WotcFormInstance';

const widgetClass = 'wotc-form-widget';
const widgetClassRendered = widgetClass + '-rendered';

export const renderWidgets = debounce(() => {
  let $targets: NodeListOf<HTMLDivElement>;
  $targets = document.querySelectorAll(`.${widgetClass}:not(.${widgetClassRendered})`);
  console.log($targets);
  $targets.forEach(renderWidget);
}, 300);

export const renderWidget = ($el: HTMLDivElement) => {
  if ($el) {
    $el.innerHTML = '';
    let config = {};
    try {
      config = JSON.parse($el.dataset.config);
    } catch (err) {
      //
    }
    const root = createRoot($el);
    root.render(<WotcFormInstance config={config} />);
  }
};

document.addEventListener('DOMContentLoaded', renderWidgets);
