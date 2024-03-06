# WOTC.com JavaScript Screening Form

An embedded JavaScript snippet to generate the WOTC.com screening form directly in your website or application.

![image](https://github.com/wotc-com/wotc-form/assets/6423115/91e98363-3df4-4263-80a2-3a4a1c9fb22c)

### Basic Implementation

```html
<form id="specialForm"></form>
<script src="https://cdn.jsdelivr.net/gh/wotc-com/wotc-form@master/build/js/forms.js"></script>
<script>
	WotcForm.init('specialForm', {
	  groupId: 484158277, // required
	  formId: 589972586, // required
	  data: { // optional to prefill form
	    name: 'Bob Hope',
	    dob: '1903-05-29'
	  }
	});
</script>
```

## React

### Installation

```sh
yarn
```

> NOTE: Importing directly to a React project and using a react component has not been tested. Currently only testing has been direct front-end implementation.

### Start Dev Server

```sh
yarn start
```

### Features:

- ES6 Support via [babel](https://babeljs.io/) (v7)
- JavaScript Linting via [eslint](https://eslint.org/)
- SASS Support via [sass-loader](https://github.com/jtangelder/sass-loader)
- Autoprefixing of browserspecific CSS rules via [postcss](https://postcss.org/) and [postcss-preset-env](https://github.com/csstools/postcss-preset-env)
- Style Linting via [stylelint](https://stylelint.io/)

