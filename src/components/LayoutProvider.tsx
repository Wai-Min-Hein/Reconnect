'use client'

import StateContext from '@/context/context'
import { MantineProvider } from '@mantine/core'
import { usePathname } from 'next/navigation'
import path from 'path'
import React from 'react'
import SideBar from './SideBar'

const LayoutProvider = ({children}:any) => {
    const pathName = usePathname()

  return (
    <div>
      {
        pathName=='/'? (
            <StateContext>
            <MantineProvider>
              <div className="flex items-start justify-between min-h-screen w-screen">
                
                <div className="basis-5/6 flex-1 w-full h-full">{children}</div>
              </div>
            </MantineProvider>
          </StateContext>
        ):(
            <StateContext>
            <MantineProvider>
              <div className="flex items-start justify-between min-h-screen w-screen">
                <div className="basis-1/6 w-full h-full">
                  <SideBar />
                </div>
                <div className="basis-5/6 flex-1 w-full h-full">{children}</div>
              </div>
            </MantineProvider>
          </StateContext>
        )
      }
    </div>
  )
}

export default LayoutProvider
