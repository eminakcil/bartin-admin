import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/news',
        name: 'News',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/news/list',
        children: [
          {
            path: '/news/list',
            name: 'NewsList',
            component: () => import('@/views/news/NewsList.vue'),
          },
          {
            path: '/news/create',
            name: 'NewsCreate',
            component: () => import('@/views/news/NewsCreate.vue'),
          },
        ],
      },

      {
        path: '/announcements',
        name: 'Announcements',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/announcements/list',
        children: [
          {
            path: '/announcements/list',
            name: 'AnnouncementsList',
            component: () =>
              import('@/views/announcements/AnnouncementList.vue'),
          },
          {
            path: '/announcements/create',
            name: 'AnnouncementsCreate',
            component: () =>
              import('@/views/announcements/AnnouncementCreate.vue'),
          },
        ],
      },

      {
        path: '/activities',
        name: 'Activities',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/activities/list',
        children: [
          {
            path: '/activities/list',
            name: 'ActivitiesList',
            component: () => import('@/views/activities/ActivityList.vue'),
          },
          {
            path: '/activities/create',
            name: 'ActivitiesCreate',
            component: () => import('@/views/activities/ActivityCreate.vue'),
          },
        ],
      },

      {
        path: '/photo-galleries',
        name: 'PhotoGalleries',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/photo-galleries/list',
        children: [
          {
            path: '/photo-galleries/list',
            name: 'PhotoGalleriesList',
            component: () =>
              import('@/views/photoGalleries/PhotoGalleryList.vue'),
          },
          {
            path: '/photo-galleries/create',
            name: 'PhotoGalleriesCreate',
            component: () =>
              import('@/views/photoGalleries/PhotoGalleryCreate.vue'),
          },
        ],
      },

      {
        path: '/videos',
        name: 'Videos',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/videos/list',
        children: [
          {
            path: '/videos/list',
            name: 'VideosList',
            component: () => import('@/views/videos/VideoList.vue'),
          },
          {
            path: '/videos/create',
            name: 'VideoCreate',
            component: () => import('@/views/videos/VideoCreate.vue'),
          },
        ],
      },

      {
        path: '/magazines',
        name: 'Magazines',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/magazines/list',
        children: [
          {
            path: '/magazines/list',
            name: 'MagazineList',
            component: () => import('@/views/magazines/MagazineList.vue'),
          },
          {
            path: '/magazines/create',
            name: 'MagazineCreate',
            component: () => import('@/views/magazines/MagazineCreate.vue'),
          },
        ],
      },

      {
        path: '/referances',
        name: 'Referances',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/referances/list',
        children: [
          {
            path: '/referances/list',
            name: 'ReferanceList',
            component: () => import('@/views/referances/ReferanceList.vue'),
          },
          {
            path: '/referances/create',
            name: 'ReferanceCreate',
            component: () => import('@/views/referances/ReferanceCreate.vue'),
          },
        ],
      },

      {
        path: '/pages',
        name: 'Pages',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/pages/list',
        children: [
          {
            path: '/pages/list',
            name: 'PageList',
            component: () => import('/src/views/extraPages/PageList.vue'),
          },
          {
            path: '/pages/create',
            name: 'PageCreate',
            component: () => import('/src/views/extraPages/PageCreate.vue'),
          },
        ],
      },

      {
        path: '/icons',
        name: 'Icons',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/icons/list',
        children: [
          {
            path: '/icons/list',
            name: 'IconList',
            component: () => import('/src/views/extraIcons/IconList.vue'),
          },
          {
            path: '/icons/create',
            name: 'IconCreate',
            component: () => import('/src/views/extraIcons/IconCreate.vue'),
          },
        ],
      },

      {
        path: '/billboards',
        name: 'Billboards',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/billboards/list',
        children: [
          {
            path: '/billboards/list',
            name: 'BillboardList',
            component: () => import('/src/views/billboards/BillboardList.vue'),
          },
          {
            path: '/billboards/create',
            name: 'BillboardCreate',
            component: () =>
              import('/src/views/billboards/BillboardCreate.vue'),
          },
        ],
      },

      {
        path: '/modals',
        name: 'Modals',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/modals/list',
        children: [
          {
            path: '/modals/list',
            name: 'ModalList',
            component: () => import('/src/views/modals/ModalList.vue'),
          },
          {
            path: '/modals/create',
            name: 'ModalCreate',
            component: () => import('/src/views/modals/ModalCreate.vue'),
          },
        ],
      },

      {
        path: '/top-menus',
        name: 'TopMenus',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/top-menus/list',
        children: [
          {
            path: '/top-menus/list',
            name: 'TopMenuList',
            component: () => import('/src/views/topMenus/TopMenuList.vue'),
          },
          {
            path: '/top-menus/create',
            name: 'TopMenuCreate',
            component: () => import('/src/views/topMenus/TopMenuCreate.vue'),
          },
        ],
      },

      {
        path: '/mid-menus',
        name: 'MidMenus',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/mid-menus/list',
        children: [
          {
            path: '/mid-menus/list',
            name: 'MidMenuList',
            component: () => import('/src/views/midMenus/MidMenuList.vue'),
          },
          {
            path: '/mid-menus/create',
            name: 'MidMenuCreate',
            component: () => import('/src/views/midMenus/MidMenuCreate.vue'),
          },
        ],
      },

      {
        path: '/header-menus',
        name: 'HeaderMenus',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/header-menus/list',
        children: [
          {
            path: '/header-menus/list',
            name: 'HeaderMenuList',
            component: () =>
              import('/src/views/headerMenus/HeaderMenuList.vue'),
          },
          {
            path: '/header-menus/create',
            name: 'HeaderMenuCreate',
            component: () =>
              import('/src/views/headerMenus/HeaderMenuCreate.vue'),
          },
        ],
      },

      {
        path: '/header-menu-items',
        name: 'HeaderMenuItems',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/header-menu-items/list',
        children: [
          {
            path: '/header-menu-items/list',
            name: 'HeaderMenuItemList',
            component: () =>
              import('/src/views/headerMenuItems/HeaderMenuItemList.vue'),
          },
          {
            path: '/header-menu-items/create',
            name: 'HeaderMenuItemCreate',
            component: () =>
              import('/src/views/headerMenuItems/HeaderMenuItemCreate.vue'),
          },
        ],
      },

      {
        path: '/footer-menus',
        name: 'FooterMenus',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/footer-menus/list',
        children: [
          {
            path: '/footer-menus/list',
            name: 'FooterMenuList',
            component: () =>
              import('/src/views/footerMenus/FooterMenuList.vue'),
          },
          {
            path: '/footer-menus/create',
            name: 'FooterMenuCreate',
            component: () =>
              import('/src/views/footerMenus/FooterMenuCreate.vue'),
          },
        ],
      },

      {
        path: '/footer-menu-items',
        name: 'FooterMenuItems',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/footer-menu-items/list',
        children: [
          {
            path: '/footer-menu-items/list',
            name: 'FooterMenuItemList',
            component: () =>
              import('/src/views/footerMenuItems/FooterMenuItemList.vue'),
          },
          {
            path: '/footer-menu-items/create',
            name: 'FooterMenuItemCreate',
            component: () =>
              import('/src/views/footerMenuItems/FooterMenuItemCreate.vue'),
          },
        ],
      },

      {
        path: '/services',
        name: 'Services',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/services/list',
        children: [
          {
            path: '/services/list',
            name: 'ServiceList',
            component: () => import('/src/views/services/ServiceList.vue'),
          },
          {
            path: '/services/create',
            name: 'ServiceCreate',
            component: () => import('/src/views/services/ServiceCreate.vue'),
          },
        ],
      },

      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
      },
    ],
  },

  // {
  //   path: '/pages',
  //   redirect: '/pages/404',
  //   name: 'Pages',
  //   component: {
  //     render() {
  //       return h(resolveComponent('router-view'))
  //     },
  //   },
  //   children: [
  //     {
  //       path: '404',
  //       name: 'Page404',
  //       component: () => import('@/views/pages/Page404'),
  //     },
  //     {
  //       path: '500',
  //       name: 'Page500',
  //       component: () => import('@/views/pages/Page500'),
  //     },
  //     {
  //       path: 'login',
  //       name: 'Login',
  //       component: () => import('@/views/pages/Login'),
  //     },
  //     {
  //       path: 'register',
  //       name: 'Register',
  //       component: () => import('@/views/pages/Register'),
  //     },
  //   ],
  // },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
