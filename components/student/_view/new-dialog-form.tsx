"use client"
import ResponsiveDialog from '@/components/responsive-dialog';
import React from 'react'
import RequestForm from '../request-form';


interface StudentDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void;
}

const NewFormDialog
 = ({
    open,
    onOpenChange
}: StudentDialogProps) => {
    return (
        <ResponsiveDialog
            title="New Request"
            description="Create new request"
            open={open}
            onOpenChange={onOpenChange}
        >
            <RequestForm
                open={open}
                onOpenChange={onOpenChange}
            />
        </ResponsiveDialog>
    )
}

export default NewFormDialog
