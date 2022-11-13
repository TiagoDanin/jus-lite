const path = require('upath')
const fs = require('fs')
const parser = require('ignored')

module.exports = function(sourceDir, targetDir) {
	var ignores = [
		/\/\./, // hidden files
		/node_modules/,
		/redirects\.json/,
		/npm-debug\.log/,
	]

	// Ignore everything in the source directory's .jusignore file.
	var jusIgnore = path.join(sourceDir, '/.jusignore')
	if (fs.existsSync(jusIgnore)) {
		parser(jusIgnore).forEach(pattern => {
			ignores = ignores.concat(pattern.replace(/^/gm, '**/'))
		})
	}

	return ignores
}