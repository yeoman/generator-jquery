'use strict';
var compareVersion = require('compare-version');
var yeoman = require('yeoman-generator');
var isOnline = require('is-online');
var pkgName = require('pkg-name');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.compareVersion = compareVersion;
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

        isOnline(function (error, online) {
          if (!online) {
            done(false);
            return;
          }

          pkgName(answers.name, function (err, available) {
            if (!available.npm || !available.bower) {
              done(true);
            }

            done(false);
          });
        });
      }
    }];

    this.prompt(prompts, function (props) {
      if (props.pkgName) {
        return this.promptingName();
      }

      // For easier access in the templates.
      this.slugname = this._.slugify(props.name);
      this.camelname = this._.camelize(props.name);

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
      store: true
    }, {
      name: 'author_name',
      store: true
    }, {
      name: 'author_email',
      store: true
    }, {
      name: 'jquery_version',
      message: 'jQuery Version'
    }, {
      type: 'list',
      name: 'kind',
      message: 'What kind of jQuery plugin would you like to create?',
      choices: [{
        name: 'Collection method',
        value: 'collection_method'
      }, {
        name: 'Static method',
        value: 'static_method'
      }, {
        name: 'Custom selector',
        value: 'custom_selector'
      }]
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
    this.copy('contributing.md', 'contributing.md');
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
