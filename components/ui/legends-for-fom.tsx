import React from 'react'
import { Lightbulb } from 'lucide-react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from './button'
import { requestForm } from '@/utils/data'

const LegendsForForm = () => {
  return (
    <div className='w-full px-6 pt-2 mx-auto max-w-screen-2xl relative'>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">
            <Lightbulb className='w-4 h-4 text-amber-500' />
            <span className='text-sm font-medium  cursor-pointer'>Legends:</span>
            <span className='text-sm text-muted-foreground'>Hover me to see list of requests</span>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className='w-100'>
          <table className="w-full">
            <tbody>
              {requestForm.map((item) => (
                <tr key={item.id}>
                  <td className="text-bold text-foreground text-sm py-1 pr-4">
                    {item.shortname}
                  </td>
                  <td className="text-sm text-muted-foreground py-1">
                    {item.fullname}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </HoverCardContent>
      </HoverCard>
    </div>

    // </HoverCard>
  )
}

export default LegendsForForm