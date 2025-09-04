import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // Running on the client
    return "";
  }
  // Running on the server
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"; // fallback during dev
};


//STUDENT CALLS
export const useGetStudentsSuspenseQuery = () => {
    return useSuspenseQuery({
        queryKey: ['students'],
        queryFn: async () => {
            const response = await axios.get(`${getBaseUrl()}/api/admin/students`)
            return response.data
        }
    })
}

export const useGetSingleStudentSuspenseQuery = (id: string | undefined ) => {
    return useSuspenseQuery({
        queryKey: ['students', id],
        queryFn: async () => {
            const response = await axios.get(`${getBaseUrl()}/api/admin/students/single/${id}`)
            return response.data
        }
    })
}




//FORM AND REQUEST CALLS
export const useGetStudentsRequestSuspenseQuery = (id: string | undefined) => {
    return useSuspenseQuery({
        queryKey: ['requests', id],
        queryFn: async () => {
            const response = await axios.get(`${getBaseUrl()}/api/admin/students/${id}`)
            return response.data
        }
    })
}


export const useGetStudentsRequestFormsSingleSuspenseQuerry = (id: string | undefined) => {
    return useQuery({
        queryKey: ['requests', id],
        queryFn: async () => {
            const response = await axios.get(`${getBaseUrl()}/api/admin/request-form/${id}`)
            return response.data
        }
    })
}

