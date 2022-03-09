const generateNavLinks = (name, suffix, mainRoute, icon = 'cil-puzzle') => {
  return {
    component: 'CNavGroup',
    name: `${name}${suffix}`,
    to: `/${mainRoute}`,
    icon,
    items: [
      {
        component: 'CNavItem',
        name: `${name} Ekle`,
        to: `/${mainRoute}/create`,
      },
      {
        component: 'CNavItem',
        name: `${name} Listele`,
        to: `/${mainRoute}/list`,
      },
    ],
  }
}

export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      text: 'NEW',
    },
  },

  generateNavLinks('Haber', 'ler', 'news'),
  generateNavLinks('Duyuru', 'lar', 'announcements'),
  generateNavLinks('Etkinlik', 'ler', 'activities'),
  generateNavLinks('Fotogaleri', '', 'photo-galleries'),
  generateNavLinks('Video', 'lar', 'videos'),
  generateNavLinks('E-Bülten', 'ler', 'magazines'),
  generateNavLinks('Referans', 'lar', 'referances'),
  generateNavLinks('Sayfa', 'lar', 'pages'),
  generateNavLinks('Simge', 'ler', 'icons'),
  generateNavLinks('Billboard', '', 'billboards'),
  generateNavLinks('Modal', '', 'modals'),
  generateNavLinks('Üst Menü', '', 'top-menus'),
  generateNavLinks('Orta Menü', '', 'mid-menus'),
  generateNavLinks('Header Menü', '', 'header-menus'),
  generateNavLinks('Header Menü Öğe', '', 'header-menu-items'),
  generateNavLinks('Footer Menü', '', 'footer-menus'),
  generateNavLinks('Footer Menü Öğe', '', 'footer-menu-items'),
  generateNavLinks('Hizmet', 'ler', 'services'),
]
