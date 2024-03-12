import { Box, Button, Card, CardContent, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { DEFAULT_CONFIG, IWotcConfig } from '../components/WotcFormInstance';

function escapeHtml(text: string) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  return text.replace(/[&<>"']/g, function (m: string | number) {
    return map[m];
  });
}

const Page = () => {
  const $form = useRef<HTMLFormElement>();
  const $example_div = useRef<HTMLPreElement>();
  const $example_script = useRef<HTMLPreElement>();
  const [exampleDiv, setExampleDiv] = useState('');
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const delta = { [e.currentTarget.name]: e.currentTarget.value };
    setConfig((prev) => ({ ...prev, ...delta }));
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const delta = Object.fromEntries(new FormData($form.current)) as Partial<IWotcConfig>;
    delta.data = {
      screening: {
        ssi_benefit: true
      }
    };
    setConfig((prev) => ({ ...prev, ...delta }));

    if (window?.WotcForm) {
      WotcForm.renderWidget(document.querySelector('.wotc-form-widget'));
    }
  };

  useEffect(() => {
    setExampleDiv(`<div 
  class="wotc-form-widget" 
  data-config='${JSON.stringify(config, null, 4)}'>
</div>`);
    //     // const form = new FormData(e.target);
    //     const config = Object.fromEntries(new FormData($form.current)) as Partial<IWotcConfig>;
    //     config.data = {
    //       screening: {
    //         ssi_benefit: true
    //       }
    //     };
    //     // console.log({config});
    //     // const params = new URLSearchParams(form);
    //     // const body = params.toString();
    //     $example_div.current.innerHTML = escapeHtml(`<div class="wotc-form-widget" data-config='${JSON.stringify(config)}'></div>`);
    //     // $example_script.current.innerHTML = escapeHtml('<script src="https://widget.wotc.com/WotcForm.js"></script>');
    //     // WotcForm.renderWidget(document.querySelector('.wotc-form-widget'));
  }, [config]);

  return (
    <>
      <nav className='wotcdemo-flex-row wotcdemo-p-1 border-bottom justify-content-between'>
        <h3>WOTC Form Widget</h3>
        <div className='wotcdemo-flex-row'>
          <h5>About</h5>
          <h5>Contact</h5>
        </div>
      </nav>
      <main className='wotcdemo-flex-column'>
        <section className='wotcdemo wotcdemo-flex-column'>
          <div>
            <h1>Template</h1>
            <p>Easily integrate the WOTC form into your website. Here's an example of the actual form...</p>
          </div>
        </section>
        <section className='wotcdemo wotcdemo-p-2'>
          <div className='wotc-form-widget' data-config='groupId=484158277&formId=2018243164&baseUrl=http%3A%2F%2Fapi.localhost%2Fv1&buttonClass=btn%20btn-primary'></div>
        </section>
        <section className='wotcdemo wotcdemo-flex-column'>
          <div>
            <h1>How to Add the WOTC Form</h1>
            <p>Follow the instructions below to add the WOTC from to your website.</p>
          </div>
        </section>
        <section className='wotcdemo wotcdemo-flex-column'>
          <ol>
            <li>
              <p>Add a &lt;div&gt; with the specified class name and attributes where you want the form to appear. Here's an example:</p>

              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Box ref={$form} component='form' onSubmit={onSubmit} gap={3} display={'flex'} flexDirection={'column'} noValidate autoComplete='off'>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                      <TextField fullWidth label='Entity ID' variant='outlined' name='entityId' value={config.entityId} onChange={onChange} />
                      <TextField label='Form ID' variant='outlined' name='formId' value={config.formId} onChange={onChange} />
                      <TextField label='Outlined' variant='outlined' name='baseUrl' value={config.baseUrl} onChange={onChange} />
                      <TextField label='Button Class' variant='outlined' name='buttonClass' value={config.buttonClass} onChange={onChange} />
                      <TextField label='Integration' variant='outlined' name='integration' value={config.integration} onChange={onChange} />
                    </div>
                    <Button variant='contained' type='submit'>
                      Submit
                    </Button>
                  </Box>
                </CardContent>
              </Card>
              <pre ref={$example_div} className='wotcdemo-pre' id='example-div'>
                {exampleDiv}
              </pre>
              <br />
              <br />
            </li>
            <li>
              <p>Add the WOTC widget script to the bottom of your page:</p>
              <pre ref={$example_script} className='wotcdemo-pre' id='example-script'>
                {'<script src="https://widget.wotc.com/WotcForm.js"></script>'}
              </pre>
            </li>
          </ol>
        </section>
        <div style={{ height: 150 }} />
      </main>
    </>
  );
};

const $el = document.getElementById('root');
createRoot($el).render(<Page />);
