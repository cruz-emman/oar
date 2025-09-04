import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCreateAddStudent, useUpdateExistingStudent } from '@/hooks/use-mutation-hooks'
import { NewRequestedSchema, NewStudentSchema, NewStudentSchemaType } from '@/utils/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { create } from 'node:domain'
import { on } from 'node:events'
import React from 'react'
import { useForm } from 'react-hook-form'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { collegeList } from '@/utils/data'


interface Props {
  open: boolean,
  onOpenChange: (open: boolean) => void;
  initialValues?: any;
}

const StudentForm = ({ open, onOpenChange, initialValues }: Props) => {


  const router = useRouter()
  const createStudent = useCreateAddStudent()
  const updateStudent = useUpdateExistingStudent(initialValues?.id)
  const form = useForm<NewStudentSchemaType>({
    resolver: zodResolver(NewStudentSchema),
    defaultValues: {
      studentNumber: initialValues?.studentNumber ?? "",
      first_name: initialValues?.first_name ?? "",
      middle_name: initialValues?.middle_name ?? "",
      last_name: initialValues?.last_name ?? "",
      college: initialValues?.college ?? "",
    }
  })



  const isEdit = !!initialValues?.id
  const isPending = createStudent.isPending || updateStudent.isPending

  const onSubmit = async (values: NewStudentSchemaType) => {
    if (isEdit) {
      updateStudent.mutate(values)
    } else {
      try {
        const createdStudent = await createStudent.mutateAsync(values)
        console.log(createdStudent)
        router.push(`/student/${createdStudent.id}`)
      } catch (error) {

      }
    }
    onOpenChange(false)
  }


  // const onSubmit = async (values: NewStudentSchemaType) => {
  //   try {

  //     const createdStudent = await createStudent.mutateAsync(values)
  //     router.push(`/student/${createdStudent.id}`)

  //   } catch (error) {
  //     console.log(error)
  //   }
  //   onOpenChange(false)
  // }

  return (
    <div className="p-2 sm:p-4 w-full max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="sm:col-span-2">
            <FormField
              control={form.control}
              name="studentNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Student No.</FormLabel>
                  <Input
                    type="number"
                    placeholder="e.g. 2024001"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    className="h-10 text-base"
                  />
                  <FormDescription className="text-xs text-muted-foreground">
                    Enter student&apos;s number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">First Name</FormLabel>
                <Input
                  placeholder="e.g John"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  className="h-10 text-base"
                />
                <FormDescription className="text-xs text-muted-foreground">
                  Enter student&apos;s first name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="middle_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Middle Name</FormLabel>
                <Input
                  placeholder="e.g Doe"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  className="h-10 text-base"
                />
                <FormDescription className="text-xs text-muted-foreground">
                  Enter student&apos;s middle name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="sm:col-span-2">
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Last Name</FormLabel>
                  <Input
                    placeholder="e.g Smith"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    className="h-10 text-base"
                  />
                  <FormDescription className="text-xs text-muted-foreground">
                    Enter student&apos;s last name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="college"
            render={({ field }) => (
              <FormItem className="sm:col-span-2"> {/* Make it span full width */}
                <FormLabel>College</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full"> {/* Ensure full width */}
                      <SelectValue placeholder="Select a college" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-[var(--radix-select-trigger-width)]">
                    {collegeList.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select Student's college
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="sm:col-span-2 pt-2 sm:pt-4">
            <div className="flex  xs:flex-row gap-2 sm:gap-3">
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
export default StudentForm