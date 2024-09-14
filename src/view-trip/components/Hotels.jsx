import React from 'react'
import HotelCardItem from './HotelCardItem'

function Hotels({ trip }) {
    return (
        <div className='font-bold text-xl mt-5 mb-5'>Hotel Recommendation
            <div className='grid grid-cols-2 md:grid-cols-3 l:grid-cols-4 gap-5'>
                {trip?.tripData?.hotels?.map((hotel, index)=> (
                    <HotelCardItem hotel={hotel}/>
                ))}
            </div>
        </div>
    )
}

export default Hotels