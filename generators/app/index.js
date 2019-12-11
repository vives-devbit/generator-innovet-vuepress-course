'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const to = require('to-case');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to ${chalk.green('Innovet Vuepress Course generator')}!`));

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
        message: 'GitHub Repo URL:'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
      this.props.slugName = to.slug(this.props.projectName);
      if (this.appname === this.props.projectName) this.props.destination = '.';
      else this.props.destination = this.props.slugName;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('core/docs'),
      this.destinationPath(`${this.props.destination}/docs`),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('core/docs/.vuepress'),
      this.destinationPath(`${this.props.destination}/docs/.vuepress`),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('core/package.json'),
      this.destinationPath(`${this.props.destination}/package.json`),
      this.props
    );
  }

  install() {
    this.log('\n\nSuccessfully Generated!!');
    this.log(`Run ${chalk.green(`npm run docs:dev`)} to start.\n`);
  }
};
