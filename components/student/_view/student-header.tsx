"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Hash, Paperclip, GraduationCap, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGetSingleStudentSuspenseQuery } from "@/hooks/use-suspense-hook";
import { Separator } from "@/components/ui/separator"
interface Props {
  id: string;
  open: boolean;
  setOpen: (value: boolean) => void;
}
const StudentHeader = ({ setOpen, open, id }: Props) => {

  const { data } = useGetSingleStudentSuspenseQuery(id)

  console.log(data)

  return (
    <div className="w-full bg-white">
      <div className=" border-0  from-card to-card/50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl">
                          <GraduationCap className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Student Profile</h1>
                              <p className="text-slate-600 mt-1">Manage and track all student requests in one place</p>
                        </div>
                      </div>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 gap-2"
              size="lg"
              onClick={() => setOpen(true)}

            >
              <Plus className="w-4 h-4" />
              Add Request Form
            </Button>
          </div>


        </div>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-8">
              <div className="flex-1 flex flex-col gap-2">
                <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide">Last Name</p>
                <span className="text-foreground font-bold text-3xl leading-tight tracking-tight">{data?.last_name}</span>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide">First Name</p>
                <span className="text-foreground font-bold text-3xl leading-tight tracking-tight">{data?.first_name}</span>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide">Middle Name</p>
                <span className="text-foreground font-bold text-3xl leading-tight tracking-tight">{data?.middle_name}</span>
              </div>
            </div>
            <Separator className="w-4 text-blue-600" />
            <div className="w-full">
              <div className="flex-1 flex">
                <span className="text-foreground font-semibold text-lg tracking-wide">{data?.college}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentHeader