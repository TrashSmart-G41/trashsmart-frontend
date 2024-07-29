import { ComponentType } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface PopupFormProps {
  formContent: ComponentType
}

export function PopupForm({ formContent: FormContent }: PopupFormProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline'>Open Form</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <FormContent />
      </AlertDialogContent>
    </AlertDialog>
  )
}
