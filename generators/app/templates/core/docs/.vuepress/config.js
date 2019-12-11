module.exports = {
  title: '<%= projectName %>',
  description: '<%= description %>',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Company', link: '<%= companyWebsite %>' },
      { text: 'License', link: '/LICENSE.md' },
    ],
    sidebar: [
      ['/', 'Home'],
    ],
    repo: '<%= repoUrl %>',
    docsDir: 'docs',
    docsBranch: 'master'
  },
  markdown: {
    lineNumbers: true,
  },
  serviceWorker: true,
  plugins: [ ],
}
