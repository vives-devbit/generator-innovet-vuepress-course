module.exports = {
  title: '<%= projectName %>',
  description: '<%= description %>',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Company', link: '<%= companyWebsite %>' },
    ],
    sidebar: [
      ['/', 'Home'],
    ]
  }
}
