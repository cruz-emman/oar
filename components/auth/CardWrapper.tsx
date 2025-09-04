import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image';

interface Props {
    title: string;
    description: string;
    children?: React.ReactNode;
}

const CardWrapper = ({ title, description, children }: Props) => {
    return (
        <Card className='w-full max-w-md mx-auto'>
            <CardHeader className="space-y-1">
                    <div className='flex items-center justify-center'>
                              <Image
                                src="/tualogo.png"
                                height={50}
                                width={50}
                                alt='Logo'
                              />
                            </div>
                    <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
                    <CardDescription className="text-center">{description}</CardDescription>
                  </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}

export default CardWrapper