"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCreateNewForm, useUpdateExistingForm } from '@/hooks/use-mutation-hooks'
import { NewRequestedSchema, NewRequestedSchemaType } from '@/utils/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, FileText, Clock, CheckCircle, Paperclip, Copy, Calendar, CalendarClock, Printer, ThumbsUp, MessageSquare } from "lucide-react"

import { useForm } from 'react-hook-form'
import { requestForm } from '@/utils/data'
import { Textarea } from '../ui/textarea'

interface Props {
  open: boolean,
  onOpenChange: (open: boolean) => void;
  initialValues?: any
}

const RequestForm = ({ open, onOpenChange, initialValues }: Props) => {



  const router = useRouter()
  const { id } = useParams()
  const createForm = useCreateNewForm()
  const updateForm = useUpdateExistingForm(undefined)
  const form = useForm<NewRequestedSchemaType>({
    resolver: zodResolver(NewRequestedSchema),
    defaultValues: {
      id: initialValues?.id ?? "",
      request: initialValues?.request ?? "TOR",
      date_request: initialValues?.date_request ?? String(new Date().toISOString().split('T')[0]),
      due_date: initialValues?.due_date ?? "",
      date_printed: initialValues?.date_printed ?? "",
      date_checked: initialValues?.date_checked ?? "",
      date_approved: initialValues?.date_approved ?? "",
      remarks: initialValues?.remarks ?? "",
      copies: initialValues?.copies ?? 1,
    }
  })


  const isEdit = !!initialValues?.id
  const isPending = createForm.isPending || updateForm.isPending



  const onSubmit = async (values: NewRequestedSchemaType) => {
    if (isEdit) {
      updateForm.mutate({ ...values, id: initialValues?.id as string })
    } else {
      createForm.mutate({ ...values, id: id as string })
    }
    onOpenChange(false)
  }





  return (
    <div className="p-2 sm:p-4 w-full max-w-4xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

          {/* Request Type - Full width on all screens */}
          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="request"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-indigo-600" />
                    Request Type
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20">
                      <SelectValue placeholder="Select request type" />
                    </SelectTrigger>
                    <SelectContent>
                      {requestForm.map((item) => (
                        <SelectItem value={item.shortname} key={item.id} >
                          {item.shortname} - {item.fullname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Number of Copies */}
          <FormField
            control={form.control}
            name="copies"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Copy className="h-4 w-4 text-orange-600" />
                  Copies
                </FormLabel>
                <Input
                  type='number'
                  className="h-10 text-base"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                  value={field.value || ""}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Requested - Left column */}
          <FormField
            control={form.control}
            name="date_request"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  Date Requested
                </FormLabel>
                <Input
                  type='date'
                  className="h-10 text-base"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Due Date - Right column */}
          <FormField
            control={form.control}
            name="due_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-amber-600" />
                  Due Date
                </FormLabel>
                <Input
                  type='date'
                  className="h-10 text-base"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Printed - Left column */}
          <FormField
            control={form.control}
            name="date_printed"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Printer className="h-4 w-4 text-green-600" />
                  Date Printed
                </FormLabel>
                <Input
                  type='date'
                  className="h-10 text-base"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Checked - Right column */}
          <FormField
            control={form.control}
            name="date_checked"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-cyan-600" />
                  Date Checked
                </FormLabel>
                <Input
                  type='date'
                  className="h-10 text-base"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Approved - Left column */}
          <FormField
            control={form.control}
            name="date_approved"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-emerald-600" />
                  Date Approved
                </FormLabel>
                <Input
                  type="date"
                  className="h-10 text-base"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Remarks - Right column */}
          <FormField
            control={form.control}
            name="remarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-slate-600" />
                  Remarks
                </FormLabel>
                <Textarea
                  placeholder="Enter any remarks..."
                  className="h-10 text-base"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Buttons - Full width */}
          <div className="md:col-span-2 pt-4">
            <div className="flex flex-col xs:flex-row gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                className="flex-1 h-10 text-sm font-medium"
                disabled={isPending}
              >
                Reset Form
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 text-sm font-medium bg-blue-600 hover:bg-blue-700"
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "Submit Registration"}
              </Button>
            </div>
          </div>

        </form>
      </Form>
    </div>
  )
}

export default RequestForm