import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { Card } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { fetchMaintenanceRequests } from './data/services'

export default function Maintenance() {
  const [maintenanceRequests, setMaintenanceRequests] = useState([])

  useEffect(() => {
    const formatDate = (timestamp: string | number) => {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
  
    const loadRequests = async () => {
      try {
        const data: any = await fetchMaintenanceRequests();
        console.log(data);
  
        const mappedData: any = data.map((request: any) => ({
          maintenance_id: `MNT-${request.id.toString().padStart(3, '0')}`,
          bin_id: `SB-${request.smartBin?.id.toString().padStart(3, '0')}`,
          type: `${request.smartBin?.wasteType} - ${request.smartBin?.binSize}`,
          date: formatDate(request.createdTimeStamp), // Apply the formatting here
          status: request.requestStatus,
          other_notes: request.otherNotes,
        }));
  
        const sortedData = mappedData.sort((a: any, b: any) =>
          b.maintenance_id.localeCompare(a.bin_id)
        );
  
        setMaintenanceRequests(sortedData);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
  
    loadRequests();
  }, []);  

  return (
    <Card className='mt-2 rounded-xl bg-card p-4'>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight text-muted-foreground'>
            Maintenance Records
          </h2>
        </div>
      </div>

      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable data={maintenanceRequests} columns={columns} />
      </div>
    </Card>
  )
}
