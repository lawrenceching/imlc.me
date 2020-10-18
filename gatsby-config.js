const lessToJson = require('less-to-json'); 

module.exports = {
  siteMetadata: {
    title: "IMLC.ME",
    description: `IMLC.ME`,
    author: `IMLC.ME`,
    beian: '粤ICP备15018861号'
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-antd',
      options: {
        style: true
      }
    },
    {
      resolve: "gatsby-plugin-less",
      options: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: lessToJson('src/theme/vars.less'),
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [{
          resolve: `gatsby-remark-static-asset-path-resolver`,
          options: {
            basePath: '/'
          }
        }],
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `posts`,
    //     path: `${__dirname}/src/posts`,
    //   },
    // },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-antd-starter`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.ico`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-git-dev`,
      options: {
        name: `gitbook-master`,
        remote: `https://github.com/lawrenceching/gitbook`,
        branch: `master`,
        patterns: `*.md`,
        overrideModifiedTime: true
      }
    },
    {
      resolve: `gatsby-source-git-dev`,
      options: {
        name: `gitbook-zh-cn`,
        remote: `https://github.com/lawrenceching/gitbook`,
        branch: `zh-cn`,
        patterns: `*.md`,
        overrideModifiedTime: true
      }
    },
    {
      resolve: `gatsby-plugin-baidu-analytics`,
      options: {
        // baidu analytics siteId
        siteId: "1c580cbd8b739e5370d4209408d10f4c",
        // Put analytics script in the head instead of the body [default:false]
        head: false,
      },
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    //`gatsby-plugin-offline`,
  ],
}
