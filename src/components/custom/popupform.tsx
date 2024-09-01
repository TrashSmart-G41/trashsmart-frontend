import { ComponentType, ReactNode } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface PopupFormProps {
  formContent: ComponentType<any>
  buttonContent?: ReactNode
  formProps?: any
  id?: string
  contId?: string
}

export function PopupForm({
  formContent: FormContent,
  buttonContent,
  formProps,
}: PopupFormProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='default'>{buttonContent}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <FormContent {...formProps} />
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function PopupForm2({
  formContent: FormContent,
  buttonContent,
  id,
  // formProps,
  contId
}: PopupFormProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button id={id} className='hidden' variant='default'>{buttonContent}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <FormContent contId={contId} />
      </AlertDialogContent>
    </AlertDialog>
  )
}


