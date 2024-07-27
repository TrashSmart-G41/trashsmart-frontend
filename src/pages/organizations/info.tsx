import { Card, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/custom/button"
import { DeleteOrg } from "./components/info/delete-popup"

const Info = () => {
    return (
        <Card className='rounded-xl bg-card p-4'>
            <div className="relative p-4 border-md border rounded-md ">
                <Button
                    variant='outline'
                    size='sm'
                    className='ml-auto hidde absolute top-2 right-2 n h-8 lg:flex'
                >
                    {/* <MixerHorizontalIcon className='mr-2 h-4 w-4' /> */}
                    <svg className='mr-2 h-4 w-4' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M3.548 20.938h16.9a.5.5 0 0 0 0-1h-16.9a.5.5 0 0 0 0 1M9.71 17.18a2.6 2.6 0 0 0 1.12-.65l9.54-9.54a1.75 1.75 0 0 0 0-2.47l-.94-.93a1.79 1.79 0 0 0-2.47 0l-9.54 9.53a2.5 2.5 0 0 0-.64 1.12L6.04 17a.74.74 0 0 0 .19.72a.77.77 0 0 0 .53.22Zm.41-1.36a1.47 1.47 0 0 1-.67.39l-.97.26l-1-1l.26-.97a1.5 1.5 0 0 1 .39-.67l.38-.37l1.99 1.99Zm1.09-1.08l-1.99-1.99l6.73-6.73l1.99 1.99Zm8.45-8.45L18.65 7.3l-1.99-1.99l1.01-1.02a.75.75 0 0 1 1.06 0l.93.94a.754.754 0 0 1 0 1.06" /></svg>
                    Edit
                </Button>

                <div className="font-semibold pb-4">
                    General Information
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <CardDescription className='text-[13px]'>Organization Name</CardDescription>
                        <div className='font-medium text-muted-foreground'>Infinite Education Network Pvt Ltd.</div>
                    </div>
                    <div>
                        <CardDescription className='text-[13px]'>Organization Type</CardDescription>
                        <div className='font-medium text-muted-foreground'>Education</div>
                    </div>
                </div>
            </div>

            {/*  */}

            <div className="relative p-4 border-md border rounded-md mt-4">
                <Button
                    variant='outline'
                    size='sm'
                    className='ml-auto hidde absolute top-2 right-2 n h-8 lg:flex'
                >
                    {/* <MixerHorizontalIcon className='mr-2 h-4 w-4' /> */}
                    <svg className='mr-2 h-4 w-4' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M3.548 20.938h16.9a.5.5 0 0 0 0-1h-16.9a.5.5 0 0 0 0 1M9.71 17.18a2.6 2.6 0 0 0 1.12-.65l9.54-9.54a1.75 1.75 0 0 0 0-2.47l-.94-.93a1.79 1.79 0 0 0-2.47 0l-9.54 9.53a2.5 2.5 0 0 0-.64 1.12L6.04 17a.74.74 0 0 0 .19.72a.77.77 0 0 0 .53.22Zm.41-1.36a1.47 1.47 0 0 1-.67.39l-.97.26l-1-1l.26-.97a1.5 1.5 0 0 1 .39-.67l.38-.37l1.99 1.99Zm1.09-1.08l-1.99-1.99l6.73-6.73l1.99 1.99Zm8.45-8.45L18.65 7.3l-1.99-1.99l1.01-1.02a.75.75 0 0 1 1.06 0l.93.94a.754.754 0 0 1 0 1.06" /></svg>
                    Edit
                </Button>

                <div className="font-semibold pb-4">
                    Contact Information
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div>
                            <CardDescription className='text-[13px]'>Primary Contact Person's Name</CardDescription>
                            <div className='font-medium text-muted-foreground'>Ranil Wickramasinghe</div>
                        </div>
                        <div className="my-2">
                            <CardDescription className='text-[13px]'>Phone Number</CardDescription>
                            <div className='font-medium text-muted-foreground'>077-4936420</div>
                        </div>
                        <div className="my-2">
                            <CardDescription className='text-[13px]'>Address</CardDescription>
                            <div className='font-medium text-muted-foreground'>789 University Avenue, Cambridge, MA, USA</div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <CardDescription className='text-[13px]'>Title/Position</CardDescription>
                            <div className='font-medium text-muted-foreground'>Cleaning Personnel Supervisor</div>
                        </div>
                        <div className="my-2">
                            <CardDescription className='text-[13px]'>Email Address</CardDescription>
                            <div className='font-medium text-muted-foreground'>supervisor@infiniteed.com</div>
                        </div>
                    </div>


                </div>
            </div>

            {/*  */}
            <div className="relative p-4 border-md border rounded-md mt-4">
                <Button
                    variant='outline'
                    size='sm'
                    className='ml-auto hidde absolute top-2 right-2 n h-8 lg:flex'
                >
                    {/* <MixerHorizontalIcon className='mr-2 h-4 w-4' /> */}
                    <svg className='mr-2 h-4 w-4' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M3.548 20.938h16.9a.5.5 0 0 0 0-1h-16.9a.5.5 0 0 0 0 1M9.71 17.18a2.6 2.6 0 0 0 1.12-.65l9.54-9.54a1.75 1.75 0 0 0 0-2.47l-.94-.93a1.79 1.79 0 0 0-2.47 0l-9.54 9.53a2.5 2.5 0 0 0-.64 1.12L6.04 17a.74.74 0 0 0 .19.72a.77.77 0 0 0 .53.22Zm.41-1.36a1.47 1.47 0 0 1-.67.39l-.97.26l-1-1l.26-.97a1.5 1.5 0 0 1 .39-.67l.38-.37l1.99 1.99Zm1.09-1.08l-1.99-1.99l6.73-6.73l1.99 1.99Zm8.45-8.45L18.65 7.3l-1.99-1.99l1.01-1.02a.75.75 0 0 1 1.06 0l.93.94a.754.754 0 0 1 0 1.06" /></svg>
                    Edit
                </Button>

                <div className="font-semibold pb-4">
                    Contact Information
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div>
                            <CardDescription className='text-[13px]'>Primary Contact Person's Name</CardDescription>
                            <div className='font-medium text-muted-foreground'>Ranil Wickramasinghe</div>
                        </div>
                        <div className="my-2">
                            <CardDescription className='text-[13px]'>Phone Number</CardDescription>
                            <div className='font-medium text-muted-foreground'>077-4936420</div>
                        </div>
                        <div className="my-2">
                            <CardDescription className='text-[13px]'>Address</CardDescription>
                            <div className='font-medium text-muted-foreground'>789 University Avenue, Cambridge, MA, USA</div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <CardDescription className='text-[13px]'>Title/Position</CardDescription>
                            <div className='font-medium text-muted-foreground'>Cleaning Personnel Supervisor</div>
                        </div>
                        <div className="my-2">
                            <CardDescription className='text-[13px]'>Email Address</CardDescription>
                            <div className='font-medium text-muted-foreground'>supervisor@infiniteed.com</div>
                        </div>
                    </div>


                </div>
            </div>

            <div className="pt-4 flex justify-end">
              {/* <Button variant="destructive">Delete Organization</Button> */}
              <DeleteOrg />
            </div>

        </Card>
    )
}

export default Info