"use client"

import UpdateFormDialog from "@/components/student/_view/update-dialog-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDeleteExistingForm, useDeleteExistingStudent } from "@/hooks/use-mutation-hooks";
import { useGetSingleStudentSuspenseQuery, useGetStudentsRequestFormsSingleSuspenseQuerry } from "@/hooks/use-suspense-hook";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { 
    CheckCheck, 
    MoreHorizontal, 
    Trash2, 
    UserIcon, 
    Hash,
    Calendar,
    CalendarClock,
    Printer,
    CheckCircle,
    ThumbsUp,
    MessageSquare,
    Copy,
    FileText,
    Clock,
    AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import UpdateStudentDialog from "../form/update-student-dialog";


export const studentsColumn: ColumnDef<any>[] = [
    {
        accessorKey: "studentNumber",
        header: () => (
            <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-blue-600" />
                <span>Student ID</span>
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="h-auto p-0 font-semibold text-left justify-start hover:bg-transparent text-blue-700 font-mono">
                        {row.original.studentNumber}
                    </p>
                </div>
            )
        }
    },
    {
        accessorKey: "first_name",
        header: () => (
            <div className="flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-green-600" />
                <span>First Name</span>
            </div>
        ),
        cell: ({ row }) => (
            <span className="text-green-700 font-medium">
                {row.original.first_name}
            </span>
        )
    },
    {
        accessorKey: "middle_name",
        header: () => (
            <div className="flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-slate-500" />
                <span>Middle Name</span>
            </div>
        ),
        cell: ({ row }) => (
            <span className="text-slate-600">
                {row.original.middle_name || "-"}
            </span>
        )
    },
    {
        accessorKey: "last_name",
        header: () => (
            <div className="flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-purple-600" />
                <span>Last Name</span>
            </div>
        ),
        cell: ({ row }) => (
            <span className="text-purple-700 font-medium">
                {row.original.last_name}
            </span>
        )
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const [openUser, setOpenUser] = useState(false)
            const { data } = useGetSingleStudentSuspenseQuery(row.original.id)
            const deleteStudent = useDeleteExistingStudent()
            return (
                <>
                    <UpdateStudentDialog
                        open={openUser}
                        onOpenChange={setOpenUser}
                        initialValues={data}
                    />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="text-slate-600" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <Link href={`/student/${row.original.id}`}>
                                <DropdownMenuItem className="cursor-pointer">
                                    <UserIcon className="h-4 w-4 mr-2 text-blue-500" />
                                    View Student
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem onClick={() => setOpenUser(true)} className="cursor-pointer">
                                <CheckCheck className="h-4 w-4 mr-2 text-green-500" />
                                Update
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteStudent.mutate(row.original.id)} className="cursor-pointer text-red-600">
                                <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )
        },
    }
]



export const formColumns: ColumnDef<any>[] = [
    {
        accessorKey: "request",
        header: () => (
            <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-indigo-600" />
                <span>Request Type</span>
            </div>
        ),
        cell: ({ row }) => {
            const requestType = row.original.request;
            const getRequestColor = (type: string) => {
                if (!type) return "secondary";
                switch (type.toLowerCase()) {
                    case "transcript": return "default";
                    case "certificate": return "secondary";
                    case "diploma": return "outline";
                    default: return "secondary";
                }
            };
            
            return requestType ? (
                <Badge variant={getRequestColor(requestType)} className="font-medium">
                    {requestType}
                </Badge>
            ) : (
                <span className="text-gray-400 italic">No request type</span>
            );
        }
    },
    {
        accessorKey: "copies",
        header: () => (
            <div className="flex items-center gap-2">
                <Copy className="h-4 w-4 text-orange-600" />
                <span>Copies</span>
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-orange-700 font-semibold">
                    {row.original.copies || 0}
                </span>
            </div>
        )
    },
    {
        accessorKey: "date_request",
        header: () => (
            <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span>Date Requested</span>
            </div>
        ),
        cell: ({ row }) => {
            let currentDate = ""
            if (row.original.date_request) {
                const newDate = new Date(row.original.date_request);
                currentDate = format(newDate, 'MMM-dd-yyyy');
            }
            
            return (
                <div className="flex items-center gap-2">
                    {currentDate ? (
                        <>
                            <Calendar className="h-3 w-3 text-blue-500" />
                            <span className="text-blue-700 font-medium">{currentDate}</span>
                        </>
                    ) : (
                        <>
                            <AlertCircle className="h-3 w-3 text-red-400" />
                            <span className="text-red-400 italic">No date yet</span>
                        </>
                    )}
                </div>
            )
        }
    },
    {
        accessorKey: "due_date",
        header: () => (
            <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-amber-600" />
                <span>Due Date</span>
            </div>
        ),
        cell: ({ row }) => {
            let currentDate = ""
            let isOverdue = false;
            
            if (row.original.due_date) {
                const newDate = new Date(row.original.due_date);
                currentDate = format(newDate, 'MMM-dd-yyyy');
                isOverdue = newDate < new Date();
            }

            return (
                <div className="flex items-center gap-2">
                    {currentDate ? (
                        <>
                            <CalendarClock className={`h-3 w-3 ${isOverdue ? 'text-red-500' : 'text-amber-500'}`} />
                            <span className={`font-medium ${isOverdue ? 'text-red-600' : 'text-amber-700'}`}>
                                {currentDate}
                            </span>
                            {isOverdue && (
                                <Badge variant="destructive" className="text-xs px-1 py-0">
                                    Overdue
                                </Badge>
                            )}
                        </>
                    ) : (
                        <>
                            <Clock className="h-3 w-3 text-red-400" />
                            <span className="text-red-400 italic">No date yet</span>
                        </>
                    )}
                </div>
            )
        }
    },
    {
        accessorKey: "date_printed",
        header: () => (
            <div className="flex items-center gap-2">
                <Printer className="h-4 w-4 text-green-600" />
                <span>Date Printed</span>
            </div>
        ),
        cell: ({ row }) => {
            let currentDate = ""
            if (row.original.date_printed) {
                const newDate = new Date(row.original.date_printed);
                currentDate = format(newDate, 'MMM-dd-yyyy');
            }
            
            return (
                <div className="flex items-center gap-2">
                    {currentDate ? (
                        <>
                            <Printer className="h-3 w-3 text-green-500" />
                            <span className="text-green-700 font-medium">{currentDate}</span>
                            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs px-1 py-0">
                                Printed
                            </Badge>
                        </>
                    ) : (
                        <>
                            <Clock className="h-3 w-3 text-gray-400" />
                            <span className="text-gray-400 italic">Not printed</span>
                        </>
                    )}
                </div>
            )
        }
    },
    {
        accessorKey: "date_checked",
        header: () => (
            <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-cyan-600" />
                <span>Date Checked</span>
            </div>
        ),
        cell: ({ row }) => {
            let currentDate = ""
            if (row.original.date_checked) {
                const newDate = new Date(row.original.date_checked);
                currentDate = format(newDate, 'MMM-dd-yyyy');
            }
            
            return (
                <div className="flex items-center gap-2">
                    {currentDate ? (
                        <>
                            <CheckCircle className="h-3 w-3 text-cyan-500" />
                            <span className="text-cyan-700 font-medium">{currentDate}</span>
                            <Badge variant="secondary" className="bg-cyan-100 text-cyan-800 text-xs px-1 py-0">
                                Checked
                            </Badge>
                        </>
                    ) : (
                        <>
                            <Clock className="h-3 w-3 text-gray-400" />
                            <span className="text-gray-400 italic">Not checked</span>
                        </>
                    )}
                </div>
            )
        }
    },
    {
        accessorKey: "date_approved",
        header: () => (
            <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 text-emerald-600" />
                <span>Date Approved</span>
            </div>
        ),
        cell: ({ row }) => {
            let currentDate = ""
            if (row.original.date_approved) {
                const newDate = new Date(row.original.date_approved);
                currentDate = format(newDate, 'MMM-dd-yyyy');
            }
            
            return (
                <div className="flex items-center gap-2">
                    {currentDate ? (
                        <>
                            <ThumbsUp className="h-3 w-3 text-emerald-500" />
                            <span className="text-emerald-700 font-medium">{currentDate}</span>
                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 text-xs px-1 py-0">
                                Approved
                            </Badge>
                        </>
                    ) : (
                        <>
                            <Clock className="h-3 w-3 text-gray-400" />
                            <span className="text-gray-400 italic">Not approved</span>
                        </>
                    )}
                </div>
            )
        }
    },
    {
        accessorKey: "remarks",
        header: () => (
            <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-slate-600" />
                <span>Remarks</span>
            </div>
        ),
        cell: ({ row }) => {
            const remarks = row.original.remarks;
            return (
                <div className="flex items-center gap-2">
                    {remarks ? (
                        <>
                            <MessageSquare className="h-3 w-3 text-slate-500" />
                            <span className="text-slate-700 max-w-xs truncate" title={remarks}>
                                {remarks}
                            </span>
                        </>
                    ) : (
                        <>
                            <MessageSquare className="h-3 w-3 text-gray-300" />
                            <span className="text-gray-400 italic">No remarks</span>
                        </>
                    )}
                </div>
            )
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const [updateAgentDialogOpen, setUpdateAgentOpenDialog] = useState(false)
            const { data } = useGetStudentsRequestFormsSingleSuspenseQuerry(row.original.id) || {};
            const deleteFormMutation = useDeleteExistingForm()
            return (
                <>
                    <UpdateFormDialog
                        open={updateAgentDialogOpen}
                        onOpenChange={setUpdateAgentOpenDialog}
                        initialValues={data}
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="text-slate-600" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setUpdateAgentOpenDialog(true)} className="cursor-pointer">
                                <CheckCheck className="h-4 w-4 mr-2 text-blue-500" />
                                Update
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteFormMutation.mutate(row.original.id)} className="cursor-pointer text-red-600">
                                <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )
        },
    }
]