"use client"

import { NewRequestedSchemaType, NewStudentSchemaType } from "@/utils/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import axios from 'axios'
import { toast } from "sonner"

export const useCreateAddStudent = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: async (values: NewStudentSchemaType) => {
            const response = await axios.post(`/api/admin/students`, values)
            return response.data
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['students'],
            })
            toast.success("student successfully created.", { position: 'bottom-center' })
        },
        onError: (error: any) => {   
            console.log(error.response.data.message)
            // toast.error(error.response.data.message)
        }
    })
    return mutation
}


export const useUpdateExistingStudent = (id: string | undefined) => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: async (values: NewStudentSchemaType) => {
            const response = await axios.patch(`/api/admin/students/single/${id}`, values)
            return response.data
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["students", id],
            })

            await queryClient.invalidateQueries({
                queryKey: ["students"],
            })
            toast.success("request successfully updated.", { position: "bottom-center" })
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    return mutation
}


export const useDeleteExistingStudent = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: async (id: string) => {
            const response = await axios.delete(`/api/admin/students/single/${id}`)
            return response.data
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['students',],
            })

            await queryClient.invalidateQueries({
                queryKey: ['total_students'],
            })
            toast.success("Student successfully deleted.", { position: 'bottom-center' })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return mutation
}


export const useCreateNewForm = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: async (values: NewRequestedSchemaType) => {
            const response = await axios.post(`/api/admin/request-form/add-form`, values)
            return response.data
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['requests'],
            })
            toast.success("Request successfully created.", { position: 'bottom-center' })
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.error || error.message || 'An error occurred'
            toast.error(errorMessage)
        }
    })

    return mutation
}

export const useUpdateExistingForm = (id: string | string[] | undefined) => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: async (values: NewRequestedSchemaType) => {
            const response = await axios.patch(`/api/admin/request-form/${values.id}`, values)
            return response.data
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["requests"],
            })
            toast.success("request successfully updated.", { position: "bottom-center" })
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    return mutation
}





export const useDeleteExistingForm = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: async (id: string) => {
            console.log(id)
            // Uncomment and fix this line - this was the issue!
            const response = await axios.delete(`/api/admin/request-form/${id}`)
            return response.data
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['requests'],
            })
            toast.success("Request successfully deleted.", { position: 'bottom-center' })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return mutation
} 