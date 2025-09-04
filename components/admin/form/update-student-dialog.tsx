import ResponsiveDialog from '@/components/responsive-dialog';
import React from 'react'
import StudentForm from './student-form';
import { init } from 'next/dist/compiled/webpack/webpack';


interface StudentDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void;
    initialValues: any
}

const UpdateStudentDialog = ({
    open,
    onOpenChange,
    initialValues
}: StudentDialogProps) => {
    return (
        <ResponsiveDialog
            title="Update Student"
            description="Update existing Student"
            open={open}
            onOpenChange={onOpenChange}
        >
            <StudentForm
                open={open}
                onOpenChange={onOpenChange}
                initialValues={initialValues}
            />
        </ResponsiveDialog>
    )
}

export default UpdateStudentDialog