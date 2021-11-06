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
  height: '100%',
  [theme.breakpoints.up('sm')]: {
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
            sx={{
              my: {
                xs: 0,
                sm: 4,
                md: 5,
              },
            }}>
            <RelativeBox sx={{ px: { xs: 1.5, sm: 4, md: 2.5 } }}>
              {children}
            </RelativeBox>
          </AbsoluteBox>
        </ContentBox>
      </Container>
      <Bottombar {...bottombarProps} />
    </div>
  )
}

export default Layout
