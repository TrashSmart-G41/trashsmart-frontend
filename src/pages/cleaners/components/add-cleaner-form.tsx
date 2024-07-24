import { Button } from '@/components/custom/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function CleanerForm() {
  const [date, setDate] = React.useState<Date>()
  return (
    <div className='gap-x-2'>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant='default'
            size='sm'
            className='ml-2 hidden h-8 lg:flex'
          >
            + Register new personnel
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader className="flex flex-col items-center justify-center">
            <DialogTitle className="text-center">Add Cleaning Personnel</DialogTitle>
            {/* Centered but commented out
            <DialogDescription className="text-center">
              Make changes to your profile here. Click save when you're done.
            </DialogDescription> */}
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center'>
              <Label htmlFor='full_name' className='col-span-4'>
                Full Name
              </Label>
              <Input id='full_name' value='' className='col-span-4 mt-1' />
            </div>
            <div className='grid grid-cols-4 items-center'>
              <Label htmlFor='contact_number' className='col-span-4'>
                Contact Number
              </Label>
              <Input id='contact_number' value='' className='col-span-4 mt-1' />
            </div>
            <div className='grid grid-cols-4 items-center'>
              <Label htmlFor='address' className='col-span-4'>
                Address
              </Label>
              <Input id='address' value='' className='col-span-4 mt-1' />
            </div>
            <div className='grid grid-cols-4 items-center'>
              <Label htmlFor='dob' className='col-span-4'>
                Date of Birth
              </Label>
              <div className='col-span-4'> 
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left font-normal w-full mt-1", 
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

          </div>
          <DialogFooter className="flex justify-center w-full">
            <div className="flex justify-center w-full">
              <Button type='submit'>Save changes</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
