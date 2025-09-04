
"use client"

import { LoadingState } from "../loading-state"
import { ErrorState } from "../error-state"
import StudentHeader from "./_view/student-header"
import { DataTableResulTable } from "../DataTableResult"
import { formColumns, studentsColumn } from "../admin/_view/column"
import { useState } from "react"
import { useGetStudentsRequestSuspenseQuery } from "@/hooks/use-suspense-hook"
import NewFormDialog from "./_view/new-dialog-form"
import { useStudentRequestQuery } from "@/hooks/use-query-hook"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SlashIcon } from "lucide-react"
import LegendsForForm from "../ui/legends-for-fom"




const StudentComponent = ({ id }: { id: string }) => {

  const { data, isLoading, isError } = useStudentRequestQuery(id)
  const [open, setOpen] = useState(false)
  const handleOpenChange = (open: boolean) => {
    setOpen(false)
  }

  if (isLoading) {
    return <StudentRequestComponentLoading />
  }
  return (
    <div className="flex flex-col w-full">
      <Breadcrumb className='p-4'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage >Student Profile</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50">
        <StudentHeader id={id} setOpen={setOpen} open={open} />
        <LegendsForForm />
        <NewFormDialog open={open} onOpenChange={handleOpenChange} />
        <DataTableResulTable setOpen={setOpen} data={data} columns={formColumns} />
      </div>
    </div>
  )
}

export default StudentComponent



export const StudentRequestComponentLoading = () => {
  return (
    <LoadingState title="Loading Students" description="This may take some time..." />
  )
}

export const StudentRequestComponentError = () => {
  return (
    <ErrorState title="Error Students" description="Something went wrong" />
  )
}