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
  }

const Adsense: FC<AdsenseProps> = ({
  adFormat = 'fluid',
  adClient,
  adSlot,
  adLayout,
  ...rest
}) => {
  useEffect(() => {
    if ('adsbygoogle' in window) {
      window.adsbygoogle.push({})
    } else {
      console.error('Adsense: adsbygoogle not found')
      window.adsbygoogle = [{}]
      const script = document.createElement('script')
      script.async = true
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`
      script.crossOrigin = 'anonymous'
      document.body.appendChild(script)
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
