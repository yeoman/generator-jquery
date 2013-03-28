'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


module.exports = JqueryGenerator;

function JqueryGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    console.log('\nI\'m all done. Just run ' + 'npm install & bower install'.bold.yellow + ' to install the required dependencies.');
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
}

util.inherits(JqueryGenerator, yeoman.generators.NamedBase);

JqueryGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  var welcome =
  '\n     _-----_' +
  '\n    |       |' +
  '\n    |' + '--(o)--'.red + '|   .--------------------------.' +
  '\n   `---------´  |    ' + 'Welcome to Yeoman,'.yellow.bold + '    |' +
  '\n    ' + '( '.yellow + '_' + '´U`'.yellow + '_' + ' )'.yellow + '   |   ' + 'ladies and gentlemen!'.yellow.bold + '  |' +
  '\n    /___A___\\   \'__________________________\'' +
  '\n     |  ~  |'.yellow +
  '\n   __' + '\'.___.\''.yellow + '__' +
  '\n ´   ' + '`  |'.red + '° ' + '´ Y'.red + ' `\n' +
  '\n' +
  '_Project Name_ should not contain "jquery" or "js" and ' +
  'should be a unique ID not already in use at plugins.jquery.com. _Project ' +
  'title_ should be a human-readable title, and doesn\'t need to contain ' +
  'the word "jQuery", although it may. For example, a plugin titled "Awesome ' +
  'Plugin" might have the name "awesome-plugin".' +
  '\n\n' +
  'For more information, please see the following documentation:' +
  '\n\n' +
  'Naming Your Plugin      http://plugins.jquery.com/docs/names/\n' +
  'Publishing Your Plugin  http://plugins.jquery.com/docs/publish/\n' +
  'Package Manifest        http://plugins.jquery.com/docs/package-manifest/\n';

  console.log(welcome);

  var prompts = [{
    name: 'name',
    title: 'Project Name:'.bold
  }, {
    name: 'title'
  }, {
    name: 'description'
  }, {
    name: 'version'
  }, {
    name: 'repository'
  }, {
    name: 'bugs'
  }, {
    name: 'licenses',
    'default': 'MIT'
  }, {
    name: 'author_name'
  }, {
    name: 'author_email'
  }, {
    name: 'jquery_version',
    message: 'jQuery Version:'
  }];

  var nameToMessage = function (name) {
    return name.split('_').map(
      function (x) { return this._.capitalize(x); }.bind(this)
    ).join(' ') + ':';
  }.bind(this);

  prompts.map(function (entry) {
    if (entry.message === undefined) {
      entry.message = nameToMessage(entry.name);
    }
    return entry;
  }.bind(this));

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.props = props;
    cb();
  }.bind(this));
};

JqueryGenerator.prototype.app = function app() {
  this.mkdir('src');
};

JqueryGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
