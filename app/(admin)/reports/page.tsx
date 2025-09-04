import ReportDashboard, { ReportComponentError, ReportComponentLoading } from '@/components/reports/report-dashboard'
import { auth } from '@/lib/auth'
import { dehydrate, HydrationBoundary, QueryClient, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect('/sign-in')
  }

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['total_students'],
    queryFn: async () => {
      const res = await axios.get(`/api/reports/widgets/total-students`)
      return res.data
    }
  })

  await queryClient.prefetchQuery({
    queryKey: ['total_requests'],
    queryFn: async () => {
      const res = await axios.get(`/api/reports/widgets/total-requests`)
      return res.data
    }
  })

  await queryClient.prefetchQuery({
    queryKey: ["report_table"],
    queryFn: async () => {
      const res = await axios.get(`/api/reports/table`)
      return res.data
    }
  })



  return (

    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ReportComponentLoading />}>
        <ErrorBoundary fallback={<ReportComponentError />}>
          <ReportDashboard />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page