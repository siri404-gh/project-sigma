import * as React from 'react'

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { Box, Container, Button } from '@mui/material'
// import MobileStepper from '@mui/material/MobileStepper'
import Link from 'next/link'

export default function Progress({
  prev,
  next,
}: {
  prev?: { url: string; title: string }
  next?: { url: string; title: string }
}) {
  const prevButton = prev ? (
    <Link href={prev.url} passHref>
      <Button style={{ display: 'flex', justifyContent: 'left' }}>
        <KeyboardArrowLeft />
        {prev.title}
      </Button>
    </Link>
  ) : (
    <Link href={'/'} passHref>
      <Button style={{ display: 'flex', justifyContent: 'left' }}>
        <KeyboardArrowLeft />
        Home
      </Button>
    </Link>
  )

  const nextButton = next ? (
    <Link href={next.url} passHref>
      <Button style={{ display: 'flex', justifyContent: 'right' }}>
        {next.title}
        <KeyboardArrowRight />
      </Button>
    </Link>
  ) : (
    <Link href={'/'} passHref>
      <Button style={{ display: 'flex', justifyContent: 'right' }}>
        <KeyboardArrowRight />
        Home
      </Button>
    </Link>
  )

  // return nextButton

  return (
    <Box
      sx={{
        borderTop: '1px solid #2e2e2e',
      }}>
      <Container
        maxWidth='md'
        sx={{
          height: 56,
          display: { xs: 'none', md: 'grid' },
          gridTemplateColumns: '1fr 1fr',
        }}>
        {prevButton}
        {nextButton}
        {/* <MobileStepper
        activeStep={-1}
        backButton={prevButton}
        nextButton={nextButton}
        position='bottom'
        steps={0}
        sx={{
          height: 56,
          backgroundColor: 'black',
          borderTop: '1px solid #2e2e2e',
          display: { xs: 'none', md: 'flex' },
        }}
        variant='dots'
      /> */}
      </Container>
    </Box>
  )
}
