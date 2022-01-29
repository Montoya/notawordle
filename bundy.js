var bundy = require('bundy');

bundy.css([
	'css/pixemoji.css'
], 'dist/css/pixemoji.css');

bundy.js([
  'js/pixemoji.js'
], 'dist/js/pixemoji.js');

bundy.copy([
    'index.html'
], 'dist/');

bundy.build();