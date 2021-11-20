import * as React from 'react'

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { Box, Button } from '@mui/material'
import Link from 'next/link'

export default function Progress({
  prev,
  next,
}: {
  prev?: { url: string; title: string }
  next?: { url: string; title: string }
}) {
  if (!prev && !next) return null

  const prevButton = prev ? (
    <Link href={prev.url} passHref>
      <Button style={{ display: 'flex' }}>
        <KeyboardArrowLeft />
        {prev.title}
      </Button>
    </Link>
  ) : (
    <Link href={'/'} passHref>
      <Button style={{ display: 'flex' }}>
        <KeyboardArrowLeft />
        Home
      </Button>
    </Link>
  )

  const nextButton = next ? (
    <Link href={next.url} passHref>
      <Button style={{ display: 'flex' }}>
        {next.title}
        <KeyboardArrowRight />
      </Button>
    </Link>
  ) : (
    <Link href={'/'} passHref>
      <Button style={{ display: 'flex' }}>
        <KeyboardArrowRight />
        Home
      </Button>
    </Link>
  )

  return (
    <Box
      sx={{
        height: 64,
        display: { xs: 'none', md: 'grid' },
        gridTemplateColumns: '1fr 1fr',
      }}>
      {prevButton}
      {nextButton}
    </Box>
  )
}
