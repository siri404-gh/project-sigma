import { NextApiResponse } from 'next'

import { fetchNavlinks } from '@/utils/fetchers'
import { flatLinks, ObjType } from '@/utils/helpers'

function generateSiteMap(links: (string | ObjType[])[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${process.env.NEXT_PUBLIC_DOMAIN}/</loc>
     </url>
     ${links
       .map(
         url => `
       <url>
           <loc>${`${process.env.NEXT_PUBLIC_DOMAIN}${url}`}</loc>
       </url>
     `,
       )
       .join('')}
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  // We make an API call to gather the URLs for our site
  const navlinks = await fetchNavlinks()
  const _flatLinks = flatLinks(navlinks, 'links', 'url', 1)

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(_flatLinks)

  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
