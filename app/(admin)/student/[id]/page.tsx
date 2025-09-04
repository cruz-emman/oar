import StudentComponent, { StudentRequestComponentError, StudentRequestComponentLoading } from "@/components/student/student-component"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

interface PageProps {
  params: Promise<{ id: string }>
}

const StudentPage = async ({ params }: PageProps) => {
  const { id } = await params
  const queryClient = new QueryClient()
  
  // Prefetch the data
  await queryClient.prefetchQuery({
    queryKey: ['students', id],
    queryFn: async () => {
      const response = await axios.get(`/api/admin/students/single/${id}`)
      return response.data
    }
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<StudentRequestComponentLoading />}>
        <ErrorBoundary fallback={<StudentRequestComponentError />}>
          <StudentComponent id={id} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default StudentPage