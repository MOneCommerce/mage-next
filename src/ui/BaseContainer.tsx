import * as React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = React.ComponentPropsWithRef<'div'> & {
  float?: 'left' | 'right' | 'none'
}

export default function BaseContainer(props: Props) {
  const { children, className, float = 'none', ...rest } = props

  return <div className="md:container mx-auto px-4">{children}</div>
}
