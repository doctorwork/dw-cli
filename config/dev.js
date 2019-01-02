'use strict';
const WEAPP_SSO_API =
    process.env.WEAPP_SSO_API || '"https://sso-qa.doctorwork.com/v1"';
const WEAPP_PUB_API =
    process.env.WEAPP_PUB_API ||
    '"https://public-qa.doctorwork.com/base-rest/v1"';
const WEAPP_APP_API =
    process.env.WEAPP_APP_API ||
    'https://healthapp-qa.doctorwork.com/mobile/v1';
const ACTIVITY_DOMAIN =
    process.env.ACTIVITY_DOMAIN ||
    '"https://web-qa.doctorwork.com/rapp/activity"';
const GRAPHQL_PATH =
    process.env.REACT_APP_GRAPHQL_PATH || 'http://localhost:7001';
const WEAPP_DOMAIN =
    process.env.WEAPP_DOMAIN || 'https://web-qa.doctorwork.com/';

exports.entry = {
    WEAPP_SSO_API,
    WEAPP_PUB_API,
    WEAPP_APP_API,
    ACTIVITY_DOMAIN
};

module.exports = {
    env: {
        NODE_ENV: '"development"',
        appId: '"wx5876f10f9a7e8b68"',
        WEAPP_PUB_API: WEAPP_PUB_API,
        WEAPP_SSO_API: WEAPP_SSO_API,
        ACTIVITY_DOMAIN: ACTIVITY_DOMAIN,
        WEAPP_APP_API: WEAPP_APP_API,
        GRAPHQL_PATH: GRAPHQL_PATH,
        DEBUG: process.env.DEBUG
    },
    defineConstants: {
        WEAPP_APP_API,
        WEAPP_PUB_API,
        WEAPP_SSO_API,
        GRAPHQL_PATH
    },
    weapp: {},
    h5: {
        devServer: {
            proxy: [
                {
                    target: 'https://sso-qa.doctorwork.com/v1',
                    pathRewrite: {
                        '^/sso': ''
                    },
                    context: ['/sso'],
                    changeOrigin: true,
                    secure: false,
                    cookieDomainRewrite: {
                        '*': ''
                    }
                },
                {
                    target: WEAPP_PUB_API,
                    pathRewrite: {
                        '^/public': ''
                    },
                    context: ['/public'],
                    changeOrigin: true,
                    secure: false,
                    cookieDomainRewrite: {
                        '*': ''
                    }
                },
                {
                    target: WEAPP_APP_API,
                    changeOrigin: true,
                    context: ['/api'],
                    pathRewrite: {
                        '^/api': ''
                    },
                    secure: false,
                    cookieDomainRewrite: {
                        '*': ''
                    }
                },
                {
                    context: ['/graphql'],
                    target: GRAPHQL_PATH,
                    changeOrigin: true,
                    secure: false,
                    cookieDomainRewrite: {
                        '*': ''
                    }
                }
            ]
        }
    }
};
