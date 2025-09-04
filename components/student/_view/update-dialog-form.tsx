"use client"
import ResponsiveDialog from '@/components/responsive-dialog';
import React from 'react'
import RequestForm from '../request-form';


interface StudentDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void;
    initialValues?:any
}

const UpdateFormDialog
 = ({
    open,
    onOpenChange,
    initialValues
}: StudentDialogProps) => {
    return (
        <ResponsiveDialog
            title="Update Request"
            description="Update existing request"
            open={open}
            onOpenChange={onOpenChange}
        >
            <RequestForm
                open={open}
                onOpenChange={onOpenChange}
                initialValues={initialValues}
            />
        </ResponsiveDialog>
    )
}

export default UpdateFormDialog
