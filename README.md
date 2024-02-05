# WOTC.com JavaScript Screening Form

A lightweight foundation for your next webpack based frontend project.

### Basic Implementation

```html
<form id="specialForm"></form>
<script src="https://cdn.jsdelivr.net/gh/wotc-com/wotc-form@master/build/js/forms.js"></script>
<script>
	WotcForm.init('specialForm', {
	  groupId: 484158277,
	  formId: 589972586
	});
</script>
```

## React

### Installation

```sh
npm i wotc-form
```

### Start Dev Server

```sh
npm start
```

### Features:

- ES6 Support via [babel](https://babeljs.io/) (v7)
- JavaScript Linting via [eslint](https://eslint.org/)
- SASS Support via [sass-loader](https://github.com/jtangelder/sass-loader)
- Autoprefixing of browserspecific CSS rules via [postcss](https://postcss.org/) and [postcss-preset-env](https://github.com/csstools/postcss-preset-env)
- Style Linting via [stylelint](https://stylelint.io/)

