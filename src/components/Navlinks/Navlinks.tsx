import React, { FC } from 'react'

import { Box, Link as MuiLink } from '@mui/material'
import { styled } from '@mui/system'
import Link from 'next/link'
export interface NavlinkType {
  title: string
  url: string
  links?: NavlinkType[]
}

export interface NavlinksProps {
  links?: NavlinkType[]
}

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
  listStyle: 'none',
  padding: 0,
  margin: 0,
}))

const StyledLi = styled(Box)({
  display: 'inline-block',
  margin: '0 10px',
})

const Navlinks: FC<NavlinksProps> = ({ links = [] }) => (
  <StyledBox component='ul'>
    {links.map(({ title, url }) => (
      <StyledLi key={title}>
        <Link href={url} passHref>
          <MuiLink underline='hover' variant='body2'>
            {title}
          </MuiLink>
        </Link>
      </StyledLi>
    ))}
  </StyledBox>
)
export default Navlinks
