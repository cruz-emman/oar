"use client"

import React, { useState } from 'react'
import ReportHeaders from './_views/report-headers'
import { LoadingState } from '../loading-state'
import { ErrorState } from '../error-state'
import { useGetTableRequestQuery } from '@/hooks/use-query-hook'
import { ReportTableColumns } from './_views/column'
import { ReportTable } from './_views/report-table'
import { endOfMonth, startOfMonth } from 'date-fns'
import LegendsForForm from '../ui/legends-for-fom'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SlashIcon } from 'lucide-react'
const ReportDashboard = () => {

  const [dateRange, setDateRange] = useState<{ from: Date, to: Date }>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date())
  })


  const { data, isLoading, isError } = useGetTableRequestQuery({ from: dateRange.from, to: dateRange.to })



  if (isError) return <ReportComponentError />

  return (
    <div className='flex flex-col w-full'>
      <Breadcrumb className='p-4'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage >Reports</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className='w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50'>
        <ReportHeaders />
        <LegendsForForm />
        {isLoading ? (
          <ReportComponentLoading />
        ) : (
          <ReportTable data={data} from={dateRange.from} to={dateRange.to} setDateRange={setDateRange} columns={ReportTableColumns} />
        )}


      </div>
    </div>
  )
}

export default ReportDashboard



export const ReportComponentLoading = () => {
  return (
    <LoadingState title="Loading datas" description="This may take some time..." />
  )
}

export const ReportComponentError = () => {
  return (
    <ErrorState title="Error datas" description="Something went wrong" />
  )
}