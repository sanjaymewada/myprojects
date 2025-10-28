/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'DevOps & Cloud Projects Showcase',
  author: 'Sanjay Mewada',
  headerTitle: 'Realtime DevOps Projects Showcase',
  description: 'A curated collection of real-time DevOps and Cloud projects, ranging from beginner to advanced levels. Built using Next.js and styled with Tailwind CSS, this showcase leverages modern web technologies to provide a fast, responsive, and interactive experience.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://projects.prodevopsguytech.com',
  siteRepo: 'https://github.com/NotHarshhaa/DevOps-Projects',
  CVUrl: 'https://t.me/prodevopsguy',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/ogimage.png`,
  email: 'sanjaymewada786@gmail.com@gmail.com',
  github: 'https://github.com/sanjaymewada',
  // x: 'https://twitter.com/x',
  // twitter: 'https://twitter.com/Twitter',
  linkedin: 'https://www.linkedin.com/in/sanjaymewada-',
  instagram: 'https://www.instagram.com/',
  medium: 'https://dev.to/@notharshhaa',
  locale: 'en-US',
  // set to true if you want a navbar fixed to the top
  stickyNav: false,
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
      src: 'https://us.umami.is/script.js'
    },
    // plausibleAnalytics: {
    //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    // If you are hosting your own Plausible.
    //   src: '', // e.g. https://plausible.my-domain.com/js/script.js
    // },
    // simpleAnalytics: {},
    // posthogAnalytics: {
    //   posthogProjectApiKey: process.env.NEXT_PUBLIC_POSTHOG_KEY, // e.g. 123e4567-e89b-12d3-a456-426614174000
    // },
    // googleAnalytics: {
    //   googleAnalyticsId: '', // e.g. G-XXXXXXX
    // },
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus, beehive
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
  // comments: {
  //   // If you want to use an analytics provider you have to add it to the
  //   // content security policy in the `next.config.js` file.
  //   // Select a provider and use the environment variables associated to it
  //   // https://vercel.com/docs/environment-variables
  //   provider: 'giscus', // supported providers: giscus, utterances, disqus
  //   giscusConfig: {
  //     // Visit the link below, and follow the steps in the 'configuration' section
  //     // https://giscus.app/
  //     repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
  //     repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
  //     category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
  //     categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
  //     mapping: 'pathname', // supported options: pathname, url, title
  //     reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
  //     // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
  //     metadata: '0',
  //     // theme example: light, dark, dark_dimmed, dark_high_contrast
  //     // transparent_dark, preferred_color_scheme, custom
  //     theme: 'light',
  //     // theme when dark mode
  //     darkTheme: 'transparent_dark',
  //     // If the theme option above is set to 'custom`
  //     // please provide a link below to your custom theme css file.
  //     // example: https://giscus.app/themes/custom_example.css
  //     themeURL: '',
  //     // This corresponds to the `data-lang="en"` in giscus's configurations
  //     lang: 'en',
  //   },
  // },
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`, // path to load documents to search
    },
    // provider: 'algolia',
    // algoliaConfig: {
    //   // The application ID provided by Algolia
    //   appId: 'R2IYF7ETH7',
    //   // Public API key: it is safe to commit it
    //   apiKey: '599cec31baffa4868cae4e79f180729b',
    //   indexName: 'docsearch',
    // },
  },
}

module.exports = siteMetadata
