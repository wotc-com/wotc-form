import { Box, Button, Card, CardContent, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
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
  const [input, setInput] = useState(DEFAULT_CONFIG);
  const [output, setOutput] = useState(DEFAULT_CONFIG);
  const [demoChecked, setDemoChecked] = useState(false);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const delta = { [e.currentTarget.name]: e.currentTarget.value };
    setInput((prev) => ({ ...prev, ...delta }));
  };

  // const onChangeDemo = (e:ChangeEvent<HTMLInputElement>, checked: boolean) => {
  //   e;
  //    onChange(checked ? '1' : '0');
  //    setInput((prev) => ({ ...prev, {demo: checked ? '1' : '0'} }));
  // }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const delta = Object.fromEntries(new FormData($form.current)) as Partial<IWotcConfig>;
    delta.data = {
      screening: {
        ssi_benefit: true
      }
    };
    console.log({ input });
    setOutput(input);
  };

  useEffect(() => {
    setInput((prev) => ({ ...prev, demo: demoChecked ? '1' : '0' }));
  }, [demoChecked]);

  useEffect(() => {
    // this is strange to make the layout look a little better
    setExampleDiv(`<div 
  class="wotc-form-widget" 
  data-config='${JSON.stringify(output, null, 4)}'>
</div>`);

    if (window?.WotcForm) {
      document.querySelector<HTMLDivElement>('.wotc-form-widget').dataset.config = JSON.stringify(output);
      WotcForm.renderWidget(document.querySelector('.wotc-form-widget'));
    }
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
  }, [output]);

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
              <p>{demoChecked ? 'demoChecked' : 'xxx'}</p>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Box ref={$form} component='form' onSubmit={onSubmit} gap={3} display={'flex'} flexDirection={'column'} noValidate autoComplete='off'>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                      <TextField fullWidth label='Entity ID' variant='outlined' name='entityId' value={input.entityId} onChange={onChange} />
                      <TextField label='Form ID' variant='outlined' name='formId' value={input.formId} onChange={onChange} />
                      <TextField label='Outlined' variant='outlined' name='baseUrl' value={input.baseUrl} onChange={onChange} />
                      <TextField label='Button Class' variant='outlined' name='buttonClass' value={input.buttonClass} onChange={onChange} />
                      <TextField label='Integration' variant='outlined' name='integration' value={input.integration} onChange={onChange} />
                      <FormGroup>
                        <FormControlLabel control={<Checkbox checked={demoChecked} name='demo' value={demoChecked ? '1' : '0'} onChange={(e) => setDemoChecked(e.currentTarget.checked)} />} label='Use Demo Data' />
                      </FormGroup>
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
