module.exports = {
    title: 'David Blog',
    description: 'Just playing around',
    base: '/blog/',
    themeConfig: {
        // logo: './bbb.png',
        editLinks: true,
        docsDir: 'docs',
        locales: {
            '/': {
                label: '简体中文',
                selectText: '选择语言',
                editLinkText: '编辑此页',
                lastUpdated: '上次更新',
                nav: [
                    {
                        text: '日记',
                        link: '/diary/',
                    },
                    {
                        text: '学习',
                        link: '/learn/'
                    },
                    {
                        text: '项目',
                        link: '/project/'
                    }
                ],
                // sidebar: {
                //     '/learn/': genSidebarConfig('学习'),
                //     '/project/': genSidebarConfig('项目'),
                //     '/diary/': genSidebarConfig('日记')
                // },
                sidebar: {
                    '/learn/': [
                        {
                            title: '学习',
                            collapsable: false,
                            children: [
                                'json-server',
                                'vue-router',
                            ]
                        }
                    ],
                    '/project/': [
                        {
                            title: '项目',
                            collapsable: false,
                        }
                    ],
                    '/diary/': [
                        {
                            title: '日记',
                            collapsable: false,
                        }
                    ],
                }
            }
        }
    }
}

function genSidebarConfig(title) {
    return [
        {
            title,
            collapsable: false,
            children: [
                'json-server',
                'vue-router',
            ]
        }
    ]
}