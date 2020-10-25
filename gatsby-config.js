const lessToJson = require('less-to-json'); 

module.exports = {
  siteMetadata: {
    title: "IMLC.ME",
    description: `IMLC.ME`,
    author: `IMLC.ME`,
    beian: '粤ICP备15018861号',
    siteUrl: `https://www.imlc.me`,
  },
  plugins: [
    `gatsby-plugin-sitemap`,
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
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-57304811-3",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true,
        // Setting this parameter is optional
        // anonymize: true,
        // Setting this parameter is also optional
        // respectDNT: true,
        // Avoids sending pageview hits from custom paths
        // exclude: [ ],
        // Delays sending pageview hits on route update (in milliseconds)
        // pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Enables Google Optimize Experiment ID
        // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // Set Variation ID. 0 for original 1,2,3....
        // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // Defers execution of google analytics script after page load
        // defer: false,
        // Any additional optional fields
        // sampleRate: 5,
        // siteSpeedSampleRate: 10,
        cookieDomain: "www.imlc.me",
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    //`gatsby-plugin-offline`,
  ],
}
