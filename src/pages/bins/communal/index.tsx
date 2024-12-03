import { DataTable } from './components/data-table'
import { columns } from './components/columns'
// import { communalBins } from './data/communalBins'
import { Card } from '@/components/ui/card'
import { fetchCommunalBins } from './data/services'
import { useEffect, useState } from 'react'
import GoogleMap, { Marker } from '@/components/custom/googlemap'

export default function CommunalBins() {
  const [communalBins, setCommunalBins] = useState([])

  // const points = [
  //   {
  //     latitude: 6.9271,
  //     longitude: 79.8612,
  //     name: 'Colombo Fort',
  //   },
  //   {
  //     latitude: 6.9308,
  //     longitude: 79.8448,
  //     name: 'Galle Face Green',
  //     svgIcon: `
  //       <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" height="24" width="24">
  //         <rect x="6" y="6" width="12" height="12" />
  //       </svg>
  //     `,
  //   },
  //   {
  //     latitude: 6.9344,
  //     longitude: 79.8521,
  //     name: 'Beira Lake',
  //     svgIcon: `
  //       <svg xmlns="http://www.w3.org/2000/svg" fill="blue" viewBox="0 0 24 24" height="24" width="24">
  //         <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM11 14h2v2h-2v-2zm0-8h2v6h-2V6z" />
  //       </svg>
  //     `,
  //   },
  //   {
  //     latitude: 6.9157,
  //     longitude: 79.8636,
  //     name: 'Viharamahadevi Park',
  //     svgIcon: `
  //       <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" height="24" width="24">
  //         <polygon points="12,2 15,22 12,17 9,22" />
  //       </svg>
  //     `,
  //   },
  //   {
  //     latitude: 6.9169,
  //     longitude: 79.8687,
  //     name: 'National Museum of Colombo',
  //     svgIcon: `
  //       <svg xmlns="http://www.w3.org/2000/svg" fill="purple" viewBox="0 0 24 24" height="24" width="24">
  //         <path d="M12 2L2 7v15h20V7L12 2zm0 2.18l8 4V20H4V8.18l8-4z" />
  //       </svg>
  //     `,
  //   },
  // ]

  useEffect(() => {
    const loadCommunalBins = async () => {
      try {
        const data: any = await fetchCommunalBins()
        console.log(data)
        const mappedData: any = data.map((communalbin: any) => ({
          //   const locationName = await getLocationName(
          //   commercialbin.latitude,
          //   commercialbin.longitude
          // ),

          bin_id: `SB-${communalbin.id.toString().padStart(3, '0')}`,
          location: `${communalbin.longitude} , ${communalbin.latitude}`,
          type: `${communalbin.wasteType} - ${communalbin.binSize}`,
          installed_date: communalbin.installationDate,
          fill_level: communalbin.fillLevel,
          status: communalbin.binStatus,
        }))

        const sortedData = mappedData.sort((a: any, b: any) =>
          b.bin_id.localeCompare(a.bin_id)
        )
        setCommunalBins(sortedData)
      } catch (error) {
        console.error('Failed to load commercial bins:', error)
      }
    }

    loadCommunalBins()
  }, [])

  const points = communalBins.map((communalbin: any) => {
    const col = communalbin.fill_level > 75 ? 'red' : 'green'
    return {
      col: col,
      latitude: communalbin.location.split(',')[1].trim(),
      longitude: communalbin.location.split(',')[0].trim(),
      name: communalbin.bin_id,
      svgIcon: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="${col}" viewBox="0 0 24 24" height="24" width="24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M4 8h16v13a1 1 0 01-1 1H5a1 1 0 01-1-1V8zm2 2v10h12V10H6zm3 2h2v6H9v-6zm4 0h2v6h-2v-6zM7 5V3a1 1 0 011-1h8a1 1 0 011 1v2h5v2H2V5h5zm2-1v1h6V4H9z" />
        </svg>
      `,
    }
  })

  return (
    <Card className='mt-2 rounded-xl bg-card p-4'>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight text-muted-foreground'>
            Communal Smart Bins
          </h2>
        </div>
      </div>

      <div className='rounded-xl bg-card p-4'>
        <GoogleMap width='100%' height={500}>
          {points.map((point, index) => (
            <Marker
              key={index}
              latitude={point.latitude}
              longitude={point.longitude}
              svgIcon={point.svgIcon}
              name={point.name}
            />
          ))}
        </GoogleMap>
      </div>

      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable data={communalBins} columns={columns} />
      </div>
    </Card>
  )
}
