import React, { useState, FC } from 'react'

import { useUser } from '@auth0/nextjs-auth0'
import { Box, Container } from '@mui/material'
import { styled } from '@mui/system'

import Bottombar from '@/components/Bottombar/Bottombar'
import Navbar, { NavbarProps } from '@/components/Navbar/Navbar'
import Navlinks, { NavlinksProps } from '@/components/Navlinks/Navlinks'
import Seo, { SEOProps } from '@/components/Seo/Seo'
import Sidebar, { SidebarProps } from '@/components/Sidebar/Sidebar'
import Social, { SocialProps } from '@/components/Social/Social'
export interface LayoutProps {
  children?: JSX.Element
  seoProps?: SEOProps
  navbarProps?: NavbarProps
  navlinksProps?: NavlinksProps
  sidebarProps?: SidebarProps
  socialProps?: SocialProps
}

const ContentBox = styled(Box)(({ theme }) => ({
  backgroundImage: "url('/img/bg/trans.png')",
  // 100vh - navbar height - bottombar height
  height: 'calc(100% - 56px - 56px)',
  [theme.breakpoints.up('sm')]: {
    // 100vh - navbar height - bottombar height
    height: 'calc(100% - 64px - 56px)',
  },
  [theme.breakpoints.up('md')]: {
    // 100vh - navbar height - bottombar height - margin
    height: 'calc(100% - 20px)',
    margin: '20px auto',
    border: 'solid 1px #2a2a2a',
    borderRadius: 8,
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
  [theme.breakpoints.up('md')]: {
    bottom: 76,
  },
}))

const RelativeBox = styled(Box)(({ theme }) => ({
  padding: 15,
  maxWidth: 900,
  margin: 'auto',
  [theme.breakpoints.up('md')]: {
    margin: '20px auto',
  },
}))

const Layout: FC<LayoutProps> = ({
  children,
  seoProps,
  navbarProps,
  navlinksProps,
  sidebarProps,
  socialProps,
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

  const bottombarProps = {
    ...navlinksProps,
  }

  return (
    <div className='layout'>
      <Seo {...seoProps} />
      <Sidebar {...sidebarProps} />
      <Navbar {...navbarProps}>
        <Navlinks {...navlinksProps} />
        <Social {...socialProps} />
      </Navbar>
      <Container
        maxWidth='md'
        sx={{
          height: {
            xs: 'calc(100vh - 56px - 56px)',
            sm: 'calc(100vh - 64px - 56px)',
            md: 'calc(100vh - 64px - 56px - 20px)',
          },
        }}
        disableGutters>
        <ContentBox>
          <AbsoluteBox>
            <RelativeBox>{children}</RelativeBox>
          </AbsoluteBox>
        </ContentBox>
      </Container>
      <Bottombar {...bottombarProps} />
    </div>
  )
}

export default Layout
