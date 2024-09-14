import { GetPlaceImages } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({ hotel }) {
    const [photoURL, setPhotoURL] = useState('');
    useEffect(() => {
        hotel && GetPlacePhoto();
    }, [hotel]);
    const GetPlacePhoto = async () => {
        const query = hotel.name
        await GetPlaceImages(query).then(response => {
            console.log(response.data.photos[0].src.landscape);
            const photoUrl = response.data.photos[2].src.landscape;
            setPhotoURL(photoUrl);
        })
            .catch(error => {
                console.log('Error fetching place image:', error);
            })
    };
    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.name + "," + hotel?.address} target='_blank'>
            <div className='hover:scale-105 transition-all cursor-pointer'>
                <img src={photoURL} className='rounded-xl'></img>
                <div className='my-2 flex flex-col'>
                    <h2 className='font-medium'>
                        {hotel.name}
                    </h2>
                    <h2 className='text-xs text-gray-500'>
                        📍 {hotel?.address}
                    </h2>
                    <h2 className='text-sm'>
                        💵 {hotel?.price}
                    </h2>
                    <h2 className='text-sm'>
                        ⭐ {hotel?.rating}
                    </h2>
                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem