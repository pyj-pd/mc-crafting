import { Anchor } from '@/components/Components'
import { UL } from '@/components/Posts/styles'
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown'
import remarkGfm from 'remark-gfm'

export interface PostProps {
  post: string
}

export const markdownProps: Partial<ReactMarkdownOptions> = {
  remarkPlugins: [remarkGfm],
  components: {
    a: ({ children, ...props }) => (
      <Anchor
        target="_blank"
        {...props}
      >
        {children}
      </Anchor>
    ),
    ul: ({ children, ...props }) => <UL {...props}>{children}</UL>,
  },
}
