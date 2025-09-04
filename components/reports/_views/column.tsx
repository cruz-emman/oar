import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { AlertCircle, Calendar, CalendarClock, Clock, Copy, FileText, Hash, UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Props {
    id: string;
    request: string;
    date_request: string;
    date_printed: string;
    date_checked: string;
    date_approved: string;
    due_date: string;
    copies: number;
    remarks: string;
    createdAt: string;
    updatedAt: string;
    studentUser: string;
    studentId: {
        studentNumber: string;
        first_name: string;
        last_name: string;
    };
}



export const ReportTableColumns: ColumnDef<Props>[] = [
    {
        accessorKey: "updatedAt",
        header: () => (
            <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-600" />
                <span>Timestamp</span>
            </div>
        ),
        cell: ({ row }) => {
            const myDate = format(new Date(row.original.updatedAt), 'yyyy-MM-dd hh:mm a');
            return (
                <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-slate-500" />
                    <span className="text-slate-700 font-mono text-sm">
                        {myDate}
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: "copies",
        header: () => (
            <div className="flex items-center gap-2">
                <Copy className="h-4 w-4 text-blue-600" />
                <span>Copies</span>
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-blue-700 font-semibold">
                    {row.getValue("copies")}
                </span>
            </div>
        )
    },
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
        accessorFn: (row) => row.studentId.studentNumber,
        id: "studentNumber",
        header: () => (
            <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-indigo-600" />
                <span>Student Number</span>
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Hash className="h-3 w-3 text-indigo-500" />
                <span className="text-indigo-700 font-mono font-semibold">
                    {row.original.studentId.studentNumber}
                </span>
            </div>
        ),
    },
    {
        accessorFn: (row) => `${row.studentId.first_name} ${row.studentId.last_name}`,
        id: "studentName",
        header: () => (
            <div className="flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-emerald-600" />
                <span>Student Name</span>
            </div>
        ),
        cell: ({ row }) => {
            const studentId = row.original.studentId;
            return (
                <div className="flex items-center gap-2">
                    <UserIcon className="h-3 w-3 text-emerald-500" />
                    <span className="text-emerald-700 font-medium">
                        {`${studentId.first_name} ${studentId.last_name}`}
                    </span>
                </div>
            );
        },
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
            const dateRequested = row.original?.date_request;
            const formattedDate = dateRequested ? format(new Date(dateRequested), 'MMM-dd-yyyy') : null;

            return (
                <div className="flex items-center gap-2">
                    {formattedDate ? (
                        <>
                            <Calendar className="h-3 w-3 text-blue-500" />
                            <span className="text-blue-700 font-medium">
                                {formattedDate}
                            </span>
                        </>
                    ) : (
                        <>
                            <AlertCircle className="h-3 w-3 text-gray-400" />
                            <span className="text-gray-400 italic">No date yet</span>
                        </>
                    )}
                </div>
            );
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
            const dueDate = row.original?.due_date;
            const isOverdue = dueDate && new Date(dueDate) < new Date();
            const formattedDate = dueDate ? format(new Date(dueDate), 'MMM-dd-yyyy') : null;

            return (
                <div className="flex items-center gap-2">
                    {formattedDate ? (
                        <>
                            <CalendarClock className={`h-3 w-3 ${isOverdue ? 'text-red-500' : 'text-amber-500'}`} />
                            <span className={`font-medium ${isOverdue ? 'text-red-600' : 'text-amber-700'}`}>
                                {formattedDate}
                            </span>
                            {isOverdue && (
                                <Badge variant="destructive" className="text-xs px-1 py-0 ml-1">
                                    Overdue
                                </Badge>
                            )}
                        </>
                    ) : (
                        <>
                            <Clock className="h-3 w-3 text-gray-400" />
                            <span className="text-gray-400 italic">No date yet</span>
                        </>
                    )}
                </div>
            );
        }
    }
]