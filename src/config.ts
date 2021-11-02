import { NavbarProps } from '@/components/Navbar/Navbar'
import { NavlinksProps } from '@/components/Navlinks/Navlinks'
import { SEOProps } from '@/components/Seo/Seo'
import { SidebarProps } from '@/components/Sidebar/Sidebar'

const envConfig: Config = JSON.parse(process.env.NEXT_PUBLIC_CONFIG || '{}')

interface Config {
  seo: SEOProps
  navbar: NavbarProps
  navlinks: NavlinksProps
  sidebar: SidebarProps
}

const config: Config = {
  seo: {},
  navbar: {},
  navlinks: {},
  sidebar: {},
}

export default { ...config, ...envConfig }
