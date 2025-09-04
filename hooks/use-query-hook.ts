import { useQuery } from "@tanstack/react-query"
import axios from "axios"


//STUDENT CALLS
export const useGetStudentsQuery = () => {
    return useQuery({
        queryKey: ['students'],
        queryFn: async () => {
            const response = await axios.get(`/api/admin/students`)
            return response.data
        }
    })
}

export const useStudentRequestQuery = (id: string | undefined) => {
    return useQuery({
        queryKey: ['requests', id],
        queryFn: async () => {
            const res = await axios.get(`/api/admin/students/${id}`)
            return res.data
        }
    })
}


//WIDGETS

//Total Students

export const useTotalStudentsQuery = () => {
    return useQuery({
        queryKey: ['total_students'],
        queryFn: async () => {
            const res = await axios.get(`/api/reports/widgets/total-students`)
            return res.data
        }
    })
}


//Total Request

export const useTotalRequestQuery = () => {
    return useQuery({
        queryKey: ['total_requests'],
        queryFn: async () => {
            const res = await axios.get(`/api/reports/widgets/total-requests`)
            return res.data
        }
    })
}


//GET Table

export const useGetTableRequestQuery = ({ from, to }: { from: Date; to: Date }) => {
    return useQuery({
        queryKey: ['report_table', from, to],
        queryFn: async () => {
            const res = await axios.get(`/api/reports/table`, {
                params: { from, to }
            })
            return res.data
        }
    })
}