import React, { useState, FunctionComponent, Fragment } from 'react'

import { Container } from '@mui/material'

import Navbar, { NavbarProps } from '@/components/Navbar/Navbar'
import Sidebar, { SidebarProps } from '@/components/Sidebar/Sidebar'

import styles from './Layout.module.css'

export interface LayoutProps {
  // bottomBarProps?: bottomBarPropsType
  // index?: number
  // sections?: bottomListType[]
  // seoProps?: seoPropsType
  // sidebarContentProps?: sidebarContentPropsType
  children?: JSX.Element
  navbarProps: NavbarProps
  sidebarProps?: SidebarProps
}

const Layout: FunctionComponent<LayoutProps> = ({
  children,
  navbarProps,
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
    <Fragment>
      <Navbar {...navbarProps} />
      <Sidebar {...sidebarProps} />
      <Container maxWidth='xl' disableGutters>
        <div className={styles.contentWrapper}>
          <div className={styles.shift} />
          {children}
        </div>
      </Container>
    </Fragment>
  )
}

export default Layout
