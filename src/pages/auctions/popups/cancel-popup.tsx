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
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/custom/button'
import { useNavigate } from 'react-router-dom'
import { cancelAuction } from '../data/services'

export function CancelAuc({ contId }: { contId: string }) {
  const navigate = useNavigate()
  const handleContinue = () => {
    try {
      const deleteAuc = async () => {
        await cancelAuction(contId)
      }
      deleteAuc();
      navigate('/auctions')
      window.location.reload()
      toast({
        description: 'Auction canceled successfully!',
        // className: 'bg-card text-destructive',
      })
    } catch (error) {
      console.log(error)
    }
  }

  

  const { toast } = useToast()
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive'>Cancel Auction</Button>
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
