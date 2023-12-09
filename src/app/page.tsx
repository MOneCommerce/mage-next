import Image from 'next/image'

import React from 'react'
import { Avatar, AvatarGroup } from '@nextui-org/react'
import BaseAvatar from '@/ui/Avatar'
import BaseAccordion from '@/ui/Accordion'
import BaseContainer from '@/ui/BaseContainer'
import BaseSkeleton from '@/ui/Skeleton/BaseSkeleton'
import BaseCard from '@/ui/Card/BaseCard'

export default function App() {
  return (
    <>
      <BaseContainer>
        <BaseAvatar />
        <BaseAccordion />
        <div className="flex flex-row">
          <div className="basis-1/4">
            <BaseCard />
          </div>
        </div>
        <BaseSkeleton />
      </BaseContainer>
    </>
  )
}
