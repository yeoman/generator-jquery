'use strict';
var chalk = require('chalk');
var compareVersion = require('compare-version');
var yeoman = require('yeoman-generator');
var pkgName = require('pkg-name');

var JqueryGenerator = module.exports = yeoman.generators.Base.extend({

  initializing: function () {
    this.pkg = require('../package.json');
    this.compareVersion = compareVersion;
  },

  prompting: function () {
    var cb = this.async();
    var log = this.log;

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

    log(welcome);

    var prompts = [{
      name: 'name',
      message: 'Project Name',
      default: this.appname,
      filter: function (input) {
        var done = this.async();

        pkgName(input, function (err, available) {
          if (!available.bower && !available.npm) {
            log.info(chalk.yellow(input) + ' already exists on npm and Bower. You might want to use another name.');
          }
          else {
            if (!available.bower) {
              log.info(chalk.yellow(input) + ' already exists on Bower. You might want to use another name.');
            }

            if (!available.npm) {
              log.info(chalk.yellow(input) + ' already exists on npm. You might want to use another name.');
            }
          }

          done(input);
        });
      }
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
  },

  configuration: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.copy('travis.yml', '.travis.yml');
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('_bowerrc', '.bowerrc');
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
    this.template('README.md');
    this.template('Gruntfile.js');
    this.template('_name.jquery.json', this.slugname + '.jquery.json');
    this.copy('CONTRIBUTING.md', 'CONTRIBUTING.md');
  },

  install: function () {
  
      this.installDependencies({ skipInstall: this.options['skip-install'] });
  }

});
