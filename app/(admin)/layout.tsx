import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

const AdminLayout = ({children}: {children: React.ReactNode}) => {
  return (
     <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
        <header className="flex h-16 items-center border-b px-4">
          <SidebarTrigger className="mr-2" />
        </header>
        <div className="flex flex-1">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminLayout