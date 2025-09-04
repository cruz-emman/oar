import ResponsiveDialog from '@/components/responsive-dialog';
import React from 'react'
import StudentForm from './student-form';


interface StudentDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void;
}

const StudentDialog = ({
    open,
    onOpenChange
}: StudentDialogProps) => {
    return (
        <ResponsiveDialog
            title="New Student"
            description="Create new Student"
            open={open}
            onOpenChange={onOpenChange}
        >
            <StudentForm
                open={open}
                onOpenChange={onOpenChange}
            />
        </ResponsiveDialog>
    )
}

export default StudentDialog