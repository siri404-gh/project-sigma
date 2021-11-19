import * as React from 'react'

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { Button } from '@mui/material'
import MobileStepper from '@mui/material/MobileStepper'
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
      <Button color='info'>
        <KeyboardArrowLeft />
        {prev.title}
      </Button>
    </Link>
  ) : null

  const nextButton = next ? (
    <Link href={next.url} passHref>
      <Button color='info'>
        {next.title}
        <KeyboardArrowRight />
      </Button>
    </Link>
  ) : null

  // return nextButton

  return (
    <MobileStepper
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
    />
  )
}
