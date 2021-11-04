// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'

import GitHubIcon from '@mui/icons-material/GitHub'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Box, Link } from '@mui/material'

const styles = {
  socialllink: { padding: 1, fontSize: 0 },
  socialIcon: {
    height: 24,
    width: 24,
    color: 'white',
  },
}

const GITHUB_LINK = 'http://g.sreeram.io'
const LINKEDIN_LINK = 'http://l.sreeram.io'
const INSTAGRAM_LINK = 'http://i.sreeram.io'
const TWITTER_LINK = 'http://t.sreeram.io'
// const STACKOVERFLOW_LINK = 'http://s.sreeram.io';
// const LEETCODE_LINK = 'http://lc.sreeram.io';
// const QUORA_LINK = 'http://q.sreeram.io'
// const SPOTIFY_LINK = 'http://sp.sreeram.io'

// const HACKERRANK_LINK = 'https://www.hackerrank.com/sreeramofficial';
// const FACEBOOK_LINK = 'https://facebook.com/sreeramslife/';
// const NPM_LINK = 'https://www.npmjs.com/~sreeramofficial';
// const CODESANDBOX_LINK = 'https://codesandbox.io/u/sreeramofficial';
// const FREECODECAMP_LINK = 'https://www.freecodecamp.org/sreeram';
// const YOUTUBE_LINK = 'https://www.youtube.com/user/thesreerampr';
// const REDDIT_LINK = 'https://www.reddit.com/user/sreeramofficial';
// const MEDIUM_LINK = 'https://medium.com/@sreeramofficial';
// const KEYBASE_LINK = 'https://keybase.io/sreeram';
// const PLAYSTORE_LINK = 'https://play.google.com/store/apps/developer?id=jsDrome&hl=en';
// const DEV_LINK = 'https://dev.to/sreeram';
// const JSFIDDLE_LINK = 'https://jsfiddle.net/sreeramofficial';
// const DOCKERHUB_LINK = 'https://hub.docker.com/u/sreeram';

const Sociallinks = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
    }}>
    <Link
      href={LINKEDIN_LINK}
      name='sreeram padmanabhan linkedin'
      rel='noreferrer'
      sx={styles.socialllink}
      target='_blank'>
      <LinkedInIcon sx={styles.socialIcon} />
      sreeram padmanabhan linkedin
    </Link>
    <Link
      href={TWITTER_LINK}
      name='sreeram padmanabhan twitter'
      rel='noreferrer'
      sx={styles.socialllink}
      target='_blank'>
      <TwitterIcon sx={styles.socialIcon} />
      sreeram padmanabhan twitter
    </Link>
    <Link
      href={GITHUB_LINK}
      name='sreeram padmanabhan spotify'
      rel='noreferrer'
      sx={styles.socialllink}
      target='_blank'>
      <GitHubIcon sx={styles.socialIcon} />
      sreeram padmanabhan github
    </Link>
    <Link
      href={INSTAGRAM_LINK}
      name='sreeram padmanabhan instagram'
      rel='noreferrer'
      sx={styles.socialllink}
      target='_blank'>
      <InstagramIcon sx={styles.socialIcon} />
      sreeram padmanabhan instagram
    </Link>
  </Box>
)

export default Sociallinks
