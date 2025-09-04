"use client"

import { ErrorState } from '@/components/error-state'
import { LoadingState } from '@/components/loading-state'
import React, { useState } from 'react'
import { DataTableResulTable } from '../../DataTableResult'
import { useGetStudentsSuspenseQuery } from '@/hooks/use-suspense-hook'
import { studentsColumn } from '../_view/column'
import StudentDialog from '../form/add-new-student-dialog'
import { Button } from '@/components/ui/button'
import { GraduationCap, Plus, SlashIcon, Users } from 'lucide-react'
import { useGetStudentsQuery, useTotalRequestQuery, useTotalStudentsQuery } from '@/hooks/use-query-hook'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import LegendsForForm from '@/components/ui/legends-for-fom'





const DashboardComponent = () => {

  const { data: students, isLoading, isError } = useGetStudentsQuery()
  const total_students = useTotalStudentsQuery()
  const total_requests = useTotalRequestQuery()
  const [open, setOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
  }

  if (isLoading) {
    return <DashboardComponentLoading />
  }

  if (isError) {
    return <DashboardComponentError />
  }


  return (
    <div className='flex flex-col w-full'>
      <Breadcrumb className='p-4'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage >Home</BreadcrumbPage>
          </BreadcrumbItem>

        </BreadcrumbList>
      </Breadcrumb>

      <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50">
        {/* Header Section */}
        <div className="bg-white border-b border-slate-200/60 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Request Management</h1>
                  <p className="text-slate-600 mt-1">Manage and track all student requests in one place</p>
                </div>
              </div>

              <Button
                onClick={() => setOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 gap-2"
                size="lg"
              >
                <Plus className="w-4 h-4" />
                Add Student
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl p-6 border border-blue-200/50">

                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-700">Total Students</p>
                    <p className="text-2xl font-bold text-blue-900">{total_students?.data}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-xl p-6 border border-emerald-200/50">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-8 h-8 text-emerald-600" />
                  <div>
                    <p className="text-sm font-medium text-emerald-700">Total Requests</p>
                    <p className="text-2xl font-bold text-emerald-900">{total_requests?.data}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-xl p-6 border border-amber-200/50">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-amber-700">New This Month</p>
                    <p className="text-2xl font-bold text-amber-900">0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50'>
          <LegendsForForm />
          <StudentDialog open={open} onOpenChange={handleOpenChange} />
          <DataTableResulTable setOpen={setOpen} data={students} columns={studentsColumn} />
        </div>
      </div>
    </div>

  )
}

export default DashboardComponent



export const DashboardComponentLoading = () => {
  return (
    <LoadingState title="Loading Students" description="This may take some time..." />
  )
}

export const DashboardComponentError = () => {
  return (
    <ErrorState title="Error Students" description="Something went wrong" />
  )
}