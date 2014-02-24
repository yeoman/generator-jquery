'use strict';
var util = require('util');
var path = require('path');
var compareVersion = require('compare-version');
var yeoman = require('yeoman-generator');


var JqueryGenerator = module.exports = function JqueryGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
  this.compareVersion = compareVersion;
};

util.inherits(JqueryGenerator, yeoman.generators.NamedBase);

JqueryGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  var welcome = this.yeoman +
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
    message: 'Project Name',
    default: this.appname
  }, {
    name: 'title',
    default: 'Awesome jQuery plugin'
  }, {
    name: 'description',
    default: 'The best jQuery plugin ever.'
  }, {
    name: 'version'
  }, {
    name: 'repository'
  }, {
    name: 'bugs'
  }, {
    name: 'license',
    default: 'MIT'
  }, {
    name: 'github_username',
  }, {
    name: 'author_name'
  }, {
    name: 'author_email'
  }, {
    name: 'jquery_version',
    message: 'jQuery Version'
  }];

  var nameToMessage = function (name) {
    return name.split('_').map(
      function (x) { return this._.capitalize(x); }.bind(this)
    ).join(' ') + ':';
  }.bind(this);

  // Generate prompt messages if only the name is defined.
  prompts.map(function (entry) {
    if (entry.message === undefined) {
      entry.message = nameToMessage(entry.name);
    }
    return entry;
  }.bind(this));

  this.currentYear = (new Date()).getFullYear();

  this.prompt(prompts, function (props) {
    this.props = props;
    // For easier access in the templates.
    this.slugname = this._.slugify(props.name);
    cb();
  }.bind(this));
};

JqueryGenerator.prototype.source = function source() {
  this.mkdir('src');
  this.copy('src/jshintrc', 'src/.jshintrc');
  this.template('src/name.js', 'src/' + this.slugname + '.js');
};

JqueryGenerator.prototype.test = function test() {
  this.mkdir('test');
  this.copy('test/jshintrc', 'test/.jshintrc');
  this.template('test/name_test.js', 'test/' + this.slugname + '_test.js');
  this.template('test/name.html', 'test/' + this.slugname + '.html');
};

JqueryGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
  this.copy('travis.yml', '.travis.yml');

  this.template('README.md');
  this.template('Gruntfile.js');
  this.template('_bower.json', 'bower.json');
  this.template('_name.jquery.json', this.slugname + '.jquery.json');
  this.template('_package.json', 'package.json');
  this.template('bowerrc', '.bowerrc');
  this.copy('CONTRIBUTING.md', 'CONTRIBUTING.md');
};
