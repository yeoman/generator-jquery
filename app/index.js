'use strict';
var chalk = require('chalk');
var compareVersion = require('compare-version');
var yeoman = require('yeoman-generator');
var pkgName = require('pkg-name');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.compareVersion = compareVersion;
  },

  welcome: function () {
    var welcome = this.yeoman +
    '"Project Name" should not contain "jquery" or "js" and ' +
    'should be a unique ID not already in use at plugins.jquery.com. "Project ' +
    'title" should be a human-readable title, and doesn\'t need to contain ' +
    'the word "jQuery", although it may. For example, a plugin titled "Awesome ' +
    'Plugin" might have the name "awesome-plugin".' +
    '\n\n' +
    'For more information, please see the following documentation:' +
    '\n\n' +
    'Naming Your Plugin      http://plugins.jquery.com/docs/names/\n' +
    'Publishing Your Plugin  http://plugins.jquery.com/docs/publish/\n' +
    'Package Manifest        http://plugins.jquery.com/docs/package-manifest/\n';

    this.log(welcome);
  },

  promptingName: function () {
    var cb = this.async();

    var prompts = [{
      name: 'name',
      message: 'Project Name',
      default: this.appname,
    }, {
      type: 'confirm',
      name: 'pkgName',
      message: 'The name above already exists on npm or Bower, choose another?',
      default: true,
      when: function (answers) {
        var done = this.async();

        pkgName(answers.name, function (err, available) {
          if (!available.npm || !available.bower) {
            done(true);
          }

          done(false);
        });
      }
    }];

    this.prompt(prompts, function (props) {
      if (props.pkgName) {
        return this.promptingName();
      }

      // For easier access in the templates.
      this.slugname = this._.slugify(props.name);

      cb();
    }.bind(this));
  },

  prompting: function () {
    var cb = this.async();

    var prompts = [{
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
        function (x) {
          return this._.capitalize(x);
        }.bind(this)
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
      this.camelname = this._.camelize(props.name);
      cb();
    }.bind(this));
  },

  configuration: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.copy('travis.yml', '.travis.yml');
    this.template('_package.json', 'package.json');
    this.template('bower.json', 'bower.json');
  },

  source: function () {
    this.mkdir('src');
    this.copy('src/jshintrc', 'src/.jshintrc');
    this.template('src/name.js', 'src/' + this.slugname + '.js');
  },

  test: function () {
    this.mkdir('test');
    this.copy('test/jshintrc', 'test/.jshintrc');
    this.template('test/name_test.js', 'test/' + this.slugname + '_test.js');
    this.template('test/name.html', 'test/' + this.slugname + '.html');
  },

  writing: function () {
    this.template('readme.md');
    this.template('Gruntfile.js');
    this.template('name.jquery.json', this.slugname + '.jquery.json');
    this.copy('contributing.md', 'contributing.md');
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
