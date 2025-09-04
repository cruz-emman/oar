import DashboardComponent, { DashboardComponentError, DashboardComponentLoading } from '@/components/admin/dashboard/DashboardComponent'
import { auth } from '@/lib/auth'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import { ErrorBoundary } from "react-error-boundary"

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

    if (!session) {
    redirect('/sign-in')
  }


    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
      queryKey: ['students'],
      queryFn: async () => {
        const response = await axios.get(`/api/admin/students`)
        return response.data
      }
    })


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<DashboardComponentLoading />}>
        <ErrorBoundary fallback={<DashboardComponentError />}>
          <DashboardComponent />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page