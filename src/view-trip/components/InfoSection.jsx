import { Button } from '@/components/ui/button'
import { GetPlaceImages } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { CiShare2 } from "react-icons/ci";

function InfoSection({ trip }) {
    const [photoURL, setPhotoURL] = useState('');
    useEffect(()=>{
        trip&&GetPlacePhoto();
    },[trip]);
    const GetPlacePhoto=async()=>{
        const query = trip?.userSelection?.destination
        await GetPlaceImages(query).then(response => {
            console.log(response.data.photos[2].src.landscape);
            const photoUrl = response.data.photos[2].src.landscape;
            setPhotoURL(photoUrl);
        })
        .catch(error => {
            console.log('Error fetching place image:', error);
        })
    };
    return (
        <div>
            <img src={photoURL} className='h-[300px] w-full object-cover rounded-xl' />
            <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'>{trip?.userSelection?.destination}</h2>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-5 '>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-l'>
                            {'📅Days: '}{trip?.userSelection?.days}
                        </h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-l'>
                            {'💵Budget: '} {trip?.userSelection?.budget}
                        </h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-l'>
                            {'🧳No of People: '}{trip?.userSelection?.companions}
                        </h2>
                    </div>
                    <Button variant="ghost"><CiShare2 /></Button>
                </div>
            </div>
        </div>
    )
}

export default InfoSection