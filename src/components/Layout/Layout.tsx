import React, { useState, FC } from 'react'

import { Box, Container } from '@mui/material'

import Navbar, { NavbarProps } from '@/components/Navbar/Navbar'
import Navlinks, { NavlinksProps } from '@/components/Navlinks/Navlinks'
import Seo, { SEOProps } from '@/components/Seo/Seo'
import Sidebar, { SidebarProps } from '@/components/Sidebar/Sidebar'

import styles from './Layout.module.css'
export interface LayoutProps {
  // bottomBarProps?: bottomBarPropsType
  // index?: number
  // sections?: bottomListType[]
  // seoProps?: seoPropsType
  // sidebarContentProps?: sidebarContentPropsType
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
  navbarProps = {
    ...navbarProps,
    onMenuClick: onSidebarToggle,
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
      <Container maxWidth='xl' disableGutters>
        <Box sx={{ height: '100vh' }}>
          <Navbar {...navbarProps}>
            <Navlinks {...navlinksProps} />
          </Navbar>
          {children}
        </Box>
      </Container>
    </div>
  )
}

export default Layout
