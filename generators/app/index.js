'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const to = require('to-case');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to ${chalk.green('Innovet VuePress Course generator')}!`));

    this.appname = this.appname.replace(/\s+/g, '-');

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'What is your project name?',
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description:',
        default: 'Awesome description'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author:'
      },
      {
        type: 'input',
        name: 'companyWebsite',
        message: 'Company Website:',
        default: 'https://www.vives.be'
      },
      {
        type: 'input',
        name: 'repoUrl',
        message: 'GitHub Repo URL (https://github.com/.....):'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
      this.props.slugName = to.slug(this.props.projectName);
      this.props.repoSSH = this.props.repoUrl.replace(
        'https://github.com/',
        'git@github.com:'
      );
      if (this.appname === this.props.projectName) this.props.destination = '.';
      else this.props.destination = this.props.slugName;
    });
  }

  writing() {
    const toCopy = [
      { source: 'core/docs', destination: 'docs' },
      { source: 'core/docs/.vuepress', destination: 'docs/.vuepress' },
      { source: 'core/package.json', destination: 'package.json' },
      { source: 'core/_.gitignore', destination: '.gitignore' },
      { source: 'core/netlify.toml', destination: 'netlify.toml' },
      { source: 'core/README.md', destination: 'README.md' }
    ];

    toCopy.forEach(entry => {
      this.fs.copyTpl(
        this.templatePath(entry.source),
        this.destinationPath(`${this.props.destination}/${entry.destination}`),
        this.props
      );
    });
  }

  installingZoomPlugin() {
    this.npmInstall(
      ['vuepress-plugin-zooming'],
      { 'save-dev': true },
      { cwd: this.props.destination }
    );
  }

  install() {
    if (this.props.repoUrl) {
      this.spawnCommandSync('git', ['init'], { cwd: this.props.destination });
      this.spawnCommandSync('git', ['remote', 'add', 'origin', `${this.props.repoSSH}`], {
        cwd: this.props.destination
      });
    }

    this.log('\n\nSuccessfully Generated!!');
    this.log(`Run ${chalk.green(`npm run docs:dev`)} to start.\n`);
  }
};
