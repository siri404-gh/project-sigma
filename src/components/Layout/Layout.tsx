import React, { useState, FC } from 'react'

import { useUser } from '@auth0/nextjs-auth0'
import { Box, Container, Typography } from '@mui/material'
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
import { useProgress, useNavlinks } from '@/utils/hooks'

import InfoMenu from '../InfoMenu/InfoMenu'
import NestedLinks from '../NestedLinks/NestedLinks'

const border = 'solid 1px #333'

const ScrollingBox = styled(Box)({
  borderTop: border,
  borderBottom: border,
  height: 'calc(100vh - 64px - 64px)',
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
  // console.log('layout beginning')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const onSidebarToggle = () => setIsSidebarOpen(!isSidebarOpen)
  const { user } = useUser()
  const navlinks = useNavlinks(navlinksProps)
  const [prev, next] = useProgress(navlinks)

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
    ...navlinks,
    sx: { height: 64, display: { xs: 'none', md: 'block' } },
  }

  const bottombarProps2 = {
    ...navlinksProps,
    sx: {
      height: 56,
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
  // console.log('layout rendering')
  return (
    <Box>
      <Seo {...seoProps} />
      <Sidebar {...sidebarProps}>
        <NestedLinks {...navlinks} onSelect={onSidebarToggle} />
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
            border: { md: border },
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
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          background: '#000',
        }}>
        {(next || prev) && <Progress next={next} prev={prev} />}
        <Bottombar {...bottombarProps2} />
        {!next && !prev && (
          <Typography
            color='white'
            sx={{
              display: 'flex',
              height: 64,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            variant='subtitle2'>
            If only one gets inspired, its a victory.
            {/* लोकः समस्ताः सुखिनो भवन्तु || */}
          </Typography>
        )}
      </div>
    </Box>
  )
}

export default Layout
