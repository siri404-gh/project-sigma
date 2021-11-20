export const fetchNavlinks = async () => {
  const url = `${process.env.NEXT_PUBLIC_REPO}/links.json`
  const res = await fetch(url)
  const data = await res.json()
  return data
}

export const postUrl = (slug: string, post = '') =>
  `${process.env.NEXT_PUBLIC_REPO}/${slug}/${post}.md`

export const fetchUserData = async (custId: string) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/user?custId=${custId}`,
  )
  return await data.json()
}
