import { defineConfig } from 'vitepress'
import csdn from "../icon/csdn"
import juejin from "../icon/juejin"


export default defineConfig({
  title: "路漫漫其修远兮 - Xaivor",
  base: '/blog/',
  description: "个人博客",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '基础知识', link: '/knowledge/js' },
    ],

    sidebar: [
      {
        text: '关于我',
        items: [
          { text: '快速了解我', link: '/me/resume' },
        ]
      },
      {
        text: '基础知识',
        items: [
          { text: 'JS部分', link: '/knowledge/js' },
          { text: 'React部分', link: '/knowledge/react' },
          { text: 'Vue部分', link: '/knowledge/vue' },
        ]
      }
    ],

    socialLinks: [
      {
        icon: {
          svg: juejin
        },
        link: 'https://juejin.cn/user/3026302649238103/posts'
      },
      {
        icon: {
          svg: csdn
        },
        link: 'https://blog.csdn.net/weixin_43759645?type=blog'
      }
    ],
  }
})
