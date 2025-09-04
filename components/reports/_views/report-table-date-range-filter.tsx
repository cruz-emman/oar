import React, { useState } from 'react';
import { Column } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DateRangeFilterProps {
  column: Column<any, unknown>;
}

export function DateRangeFilter({ column }: DateRangeFilterProps) {
  const columnFilterValue = column.getFilterValue() as [Date | undefined, Date | undefined] | undefined;
  const [startDate, endDate] = columnFilterValue || [undefined, undefined];
  const [open, setOpen] = useState(false)

  const handleStartDateChange = (value: string) => {
    const date = value ? new Date(value) : undefined;
    column.setFilterValue([date, endDate]);
  };

  const handleEndDateChange = (value: string) => {
    const date = value ? new Date(value) : undefined;
    column.setFilterValue([startDate, date]);
  };

  const clearFilter = () => {
    column.setFilterValue(undefined);
  };

  const formatDateForInput = (date: Date | undefined) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const hasFilter = startDate || endDate


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={hasFilter ? "secondary" : "outline"} size="sm" className="h-8 border-dashed">
          <CalendarDays className="h-4 w-4" />
          Filter by date
          {hasFilter && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="h-4 w-4 p-0 hover:bg-transparent"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="start">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Filter by Date Range</h4>
            {hasFilter && (
              <Button variant="ghost" size="sm" onClick={clearFilter} className="h-6 w-6 p-0">
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date" className="text-xs font-medium">
                From Date
              </Label>
              <Input
                id="start-date"
                type="date"
                value={formatDateForInput(startDate)}
                onChange={(e) => handleStartDateChange(e.target.value)}
                className="text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date" className="text-xs font-medium">
                To Date
              </Label>
              <Input
                id="end-date"
                type="date"
                value={formatDateForInput(endDate)}
                onChange={(e) => handleEndDateChange(e.target.value)}
                className="text-sm"
              />
            </div>
          </div>

          {hasFilter && (
            <div className="text-xs text-muted-foreground p-2 bg-muted rounded">
              {startDate && endDate
                ? `Showing dates from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`
                : startDate
                  ? `Showing dates from ${startDate.toLocaleDateString()} onwards`
                  : `Showing dates up to ${endDate?.toLocaleDateString()}`}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}