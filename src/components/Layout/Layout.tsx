import React, { useState, FC } from 'react'

import { useUser } from '@auth0/nextjs-auth0'
import { Box, Container } from '@mui/material'
import { styled } from '@mui/system'

import Alerts from '@/components/Alerts/Alerts'
import Bottombar from '@/components/Bottombar/Bottombar'
import { BottombarProps } from '@/components/Bottombar/Bottombar'
import Navbar, { NavbarProps } from '@/components/Navbar/Navbar'
import Progress from '@/components/Progress/Progress'
import Seo, { SEOProps } from '@/components/Seo/Seo'
import Sidebar, { SidebarProps } from '@/components/Sidebar/Sidebar'
import { SpeedDialProps } from '@/components/SpeedDial/SpeedDial'
import UserMenu, { UserMenuProps } from '@/components/UserMenu/UserMenu'
import { useProgress } from '@/utils/hooks'

import InfoMenu from '../InfoMenu/InfoMenu'
import NestedLinks from '../NestedLinks/NestedLinks'

const ScrollingBox = styled(Box)({
  borderTop: 'solid 1px #333',
  borderBottom: 'solid 1px #333',
  overflow: 'scroll',
  height: 'calc(100vh - 64px - 64px - 2px)',
  overflowY: 'scroll',
})
export interface LayoutProps {
  children?: JSX.Element
  seoProps?: SEOProps
  navbarProps?: NavbarProps
  navlinksProps?: BottombarProps
  sidebarProps?: SidebarProps
  socialProps?: SpeedDialProps
  userMenuProps?: UserMenuProps
}

const Layout: FC<LayoutProps> = ({
  children,
  seoProps,
  navbarProps,
  navlinksProps,
  sidebarProps,
  socialProps,
  userMenuProps,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const onSidebarToggle = () => setIsSidebarOpen(!isSidebarOpen)
  const { user } = useUser()
  const { prev, next } = useProgress()

  sidebarProps = {
    ...sidebarProps,
    isOpen: isSidebarOpen,
    onClose: onSidebarToggle,
    onOpen: onSidebarToggle,
  }

  navbarProps = {
    ...navbarProps,
    onMenuClick: onSidebarToggle,
  }

  const bottombarProps1 = {
    ...navlinksProps,
    sx: { height: 64, display: { xs: 'none', md: 'block' } },
  }

  const bottombarProps2 = {
    ...navlinksProps,
    sx: {
      height: 56,
      borderTop: 'solid 1px #333',
      position: 'fixed',
      bottom: 0,
      width: '100%',
      display: { md: 'none' },
    },
  }

  userMenuProps = {
    ...userMenuProps,
    avatarUrl: user?.picture || '',
    isUserLoggedIn: !!user,
  }

  return (
    <Box>
      <Seo {...seoProps} />
      <Sidebar {...sidebarProps}>
        <NestedLinks {...navlinksProps} />
      </Sidebar>
      <Alerts />
      <Navbar {...navbarProps}>
        <Bottombar {...bottombarProps1} />
        <Box
          sx={{ display: 'flex', width: { md: 175 }, justifyContent: 'right' }}>
          <UserMenu {...userMenuProps} />
          <InfoMenu {...socialProps} />
        </Box>
      </Navbar>
      <ScrollingBox id='scrolling'>
        <Container
          maxWidth={'md'}
          sx={{
            position: 'relative',
            border: { md: 'solid 1px #333' },
            borderRadius: { md: 4 },
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            my: {
              xs: 0,
              md: 2.5,
            },
            p: {
              xs: 1,
              sm: 2,
              md: 2.5,
            },
            minHeight: 'fill-available',
          }}>
          {children}
        </Container>
      </ScrollingBox>
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}>
        <Progress next={next} prev={prev} />
        <Bottombar {...bottombarProps2} />
      </div>
    </Box>
  )
}

export default Layout
