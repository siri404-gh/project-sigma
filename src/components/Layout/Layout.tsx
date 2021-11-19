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
import SpeedDial, { SpeedDialProps } from '@/components/SpeedDial/SpeedDial'
import UserMenu, { UserMenuProps } from '@/components/UserMenu/UserMenu'

import InfoMenu from '../InfoMenu/InfoMenu'
import NestedLinks from '../NestedLinks/NestedLinks'
import { useRouter } from 'next/router'
import { useNavlinks, useProgress } from '@/utils/hooks'

export interface LayoutProps {
  children?: JSX.Element
  seoProps?: SEOProps
  navbarProps?: NavbarProps
  navlinksProps?: BottombarProps
  sidebarProps?: SidebarProps
  socialProps?: SpeedDialProps
  userMenuProps?: UserMenuProps
}

const ContentBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  height: '100%',
  [theme.breakpoints.up('sm')]: {
    borderRadius: 8,
  },
  [theme.breakpoints.up('md')]: {
    border: 'solid 1px #2a2a2a',
  },
}))

const AbsoluteBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 56,
  left: 0,
  right: 0,
  bottom: 56,
  overflow: 'scroll',
  [theme.breakpoints.up('sm')]: {
    top: 64,
  },
}))

const RelativeBox = styled(Box)({
  maxWidth: 860,
  height: '100%',
  margin: 'auto',
})

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
    <Box id='layout' sx={{ height: '100vh' }}>
      <Seo {...seoProps} />
      <Sidebar {...sidebarProps}>
        <NestedLinks {...navlinksProps} />
      </Sidebar>
      <Alerts />
      <Navbar {...navbarProps}>
        <Bottombar {...bottombarProps1} />
        <Box
          sx={{ display: 'flex', width: { md: 250 }, justifyContent: 'right' }}>
          <UserMenu {...userMenuProps} />
          <InfoMenu {...socialProps} />
        </Box>
      </Navbar>
      <Container
        maxWidth='md'
        sx={{
          height: {
            xs: 'calc(100vh - 56px - 56px - 1px)',
            sm: 'calc(100vh - 64px - 56px - 1px)',
          },
          p: {
            xs: 0,
            sm: 2,
            md: 2.5,
          },
        }}
        disableGutters>
        <ContentBox>
          <AbsoluteBox
            id='scrolling'
            sx={{
              my: {
                xs: 0,
                sm: 4,
                md: 5,
              },
            }}>
            <RelativeBox
              id='relative-box'
              sx={{
                p: { xs: 1.5, sm: 0, md: 0 },
                px: { xs: 1.5, sm: 4, md: 2.5 },
              }}>
              {children}
            </RelativeBox>
          </AbsoluteBox>
        </ContentBox>
      </Container>
      {(next || prev) && <Progress next={next} prev={prev} />}
      {/* <SpeedDial {...socialProps} /> */}
      <Bottombar {...bottombarProps2} />
    </Box>
  )
}

export default Layout
