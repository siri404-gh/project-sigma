import React, { useState, FC } from 'react'

import { useUser } from '@auth0/nextjs-auth0'
import { Container } from '@mui/material'

import Navbar, { NavbarProps } from '@/components/Navbar/Navbar'
import Navlinks, { NavlinksProps } from '@/components/Navlinks/Navlinks'
import Seo, { SEOProps } from '@/components/Seo/Seo'
import Sidebar, { SidebarProps } from '@/components/Sidebar/Sidebar'
import Sociallinks from '@/components/Sociallinks/Sociallinks'

export interface LayoutProps {
  children?: JSX.Element
  seoProps?: SEOProps
  navbarProps?: NavbarProps
  navlinksProps?: NavlinksProps
  sidebarProps?: SidebarProps
}

const Layout: FC<LayoutProps> = ({
  children,
  seoProps,
  navbarProps,
  navlinksProps,
  sidebarProps,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const onSidebarToggle = () => setIsSidebarOpen(!isSidebarOpen)
  const { user } = useUser()

  navbarProps = {
    ...navbarProps,
    onMenuClick: onSidebarToggle,
    isUserLoggedIn: !!user,
    avatarUrl: user?.picture || '',
  }
  sidebarProps = {
    ...sidebarProps,
    isOpen: isSidebarOpen,
    onClose: onSidebarToggle,
    onOpen: onSidebarToggle,
  }

  return (
    <div className='layout'>
      <Seo {...seoProps} />
      <Sidebar {...sidebarProps} />
      <Container maxWidth='md' sx={{ height: '100vh' }} disableGutters>
        <Navbar {...navbarProps}>
          <Sociallinks />
          <Navlinks {...navlinksProps} />
        </Navbar>
        {children}
      </Container>
    </div>
  )
}

export default Layout
