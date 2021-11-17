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
    <Button component={Link} href={prev.url}>
      <KeyboardArrowLeft />
      {prev.title}
    </Button>
  ) : null

  const nextButton = next ? (
    <Link href={next.url} passHref>
      <Button variant='contained'>
        Next: {next.title}
        <KeyboardArrowRight />
      </Button>
    </Link>
  ) : null

  return (
    <MobileStepper
      activeStep={-1}
      backButton={null}
      nextButton={nextButton}
      position='static'
      steps={1}
      sx={{ backgroundColor: 'black' }}
      variant='text'
    />
  )
}
