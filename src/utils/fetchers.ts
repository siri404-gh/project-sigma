export const fetchUserData: (custId: string) => Promise<any> = async custId => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/user?custId=${custId}`,
  )
  return await data.json()
}

export const fetchPost = async (slug: string, post = 'index') => {
  const url = `https://raw.githubusercontent.com/sreeramofficial/blog-posts/master/${slug}/${post}.md`
  const res = await fetch(url)
  const data = await res.text()
  return data
}

export const fetchNavlinks = async () => {
  const url =
    'https://raw.githubusercontent.com/sreeramofficial/blog-posts/master/links.json'
  const res = await fetch(url)
  const data = await res.json()
  return data
}
