import React, { FC, ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia as theme } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { Typography, Link } from '@mui/material'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

const components = {
  code: ({
    inline,
    className,
    children,
    ...props
  }: {
    inline: boolean
    className: string
    children: ReactNode
    props: unknown
  }) => {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter
        language={match[1]}
        PreTag='div'
        style={theme}
        {...props}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
  a: ({ href, children }: { href: string; children: string }) => (
    <Link href={href}>{children}</Link>
  ),
  p: ({ children }: { children: string }) => (
    <Typography
      color='primary'
      component='p'
      sx={{ textAlign: 'justify' }}
      variant='body1'
      paragraph>
      {children}
    </Typography>
  ),
  span: ({ children }: { children: string }) => (
    <Typography color='primary' component='span' variant='body2' paragraph>
      {children}
    </Typography>
  ),
  li: ({ children }: { children: string }) => (
    <li>
      <Typography color='primary' component='span'>
        {children}
      </Typography>
    </li>
  ),
  h1: ({ children }: { children: string }) => (
    <Typography color='primary' component={'h1'} variant={'h5'} gutterBottom>
      {children}
    </Typography>
  ),
  h2: ({ children }: { children: string }) => (
    <Typography color='primary' component={'h2'} variant={'h6'} gutterBottom>
      {children}
    </Typography>
  ),
  h3: ({ children }: { children: string }) => (
    <Typography
      color='primary'
      component={'h3'}
      variant={'subtitle1'}
      gutterBottom>
      {children}
    </Typography>
  ),
  h4: ({ children }: { children: string }) => (
    <Typography
      color='primary'
      component={'h4'}
      variant={'caption'}
      gutterBottom>
      {children}
    </Typography>
  ),
}

interface MarkdownProps {
  children: string
}

const Markdown: FC<MarkdownProps> = props => (
  <ReactMarkdown
    className='markdown'
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-line
    components={components}
    rehypePlugins={[rehypeRaw]}
    remarkPlugins={[remarkGfm]}
    {...props}
  />
)

export default Markdown
