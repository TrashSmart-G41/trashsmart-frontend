import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
// import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/custom/button'
import { useNavigate } from 'react-router-dom'
import { deleteRecyclingPlant } from '../data/services'

export function DeleteRecyclingPlant({ contId }: { contId: string }) {
  //   let desc : string = ""
  const navigate = useNavigate()
  const handleContinue = () => {
    try {
      const deletePlant = async () => {
        const response = await deleteRecyclingPlant(contId)
        if (response.status === 200) {
          //   desc = 'Organization deleted successfully!'
        }
      }
      deletePlant()
    } catch (error) {
      // console.error(error)
      //   desc = 'Error deleting organization!'
    }

    navigate('/recycling-plant')
    window.location.reload()
    // toast({
    //     description: desc,
    // })
  }

  // const { toast } = useToast()
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 px-2 text-[12px] text-primary/80 hover:text-destructive'
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleContinue}
            className='bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90'
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
