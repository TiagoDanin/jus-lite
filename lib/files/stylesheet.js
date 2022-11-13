'use strict'

const path            = require('upath')
const sass            = require('node-sass')
const myth            = require('myth')
const File            = require('../file')

module.exports = class Stylesheet extends File {
  constructor(filepath, sourceDir, targetDir) {
    super(filepath, sourceDir, targetDir)
  }

  squeeze() {
    this.squeezed = false
    this.read()
    this.squeezed = true
  }

  render(context, done) {
    let output

    if (this.isCSS) {
      // Replace this library
      output = myth(this.input, {source: this.path.full})
      return done(null, output)
    }

    if (this.isSCSS) {
      output = sass
        .renderSync({
          data: this.input,
          includePaths: [path.dirname(this.path.full)]
        })
        .css
        .toString('utf8')
      return done(null, output)
    }

    return done(null, this.input)
  }

  get isSass() {
    return this.path.ext.toLowerCase() === '.sass'
  }

  get isCSS() {
    return this.path.ext.toLowerCase() === '.css'
  }
}
