import React, { FC, useEffect } from 'react'

interface AdsenseProps {
  adClient: string
  adFormat?: string
  adLayout?: string
  adSlot: string
}

declare const window: Window &
  typeof globalThis & {
    adsbygoogle: any
    isAdsenseLoaded: boolean
  }

const Adsense: FC<AdsenseProps> = ({
  adFormat = 'fluid',
  adClient,
  adSlot,
  adLayout,
  ...rest
}) => {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <ins
      className='adsbygoogle'
      data-ad-client={adClient}
      data-ad-format={adFormat}
      data-ad-layout-key={adLayout}
      data-ad-slot={adSlot}
      data-adtest={process.env.NODE_ENV === 'development' ? 'on' : 'off'}
      style={{ display: 'block' }}
      {...rest}
    />
  )
}

export default Adsense
