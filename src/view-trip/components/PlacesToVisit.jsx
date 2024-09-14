import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { FaMapMarkedAlt } from "react-icons/fa";
import { GetPlaceImages } from '@/service/GlobalAPI';

function PlacesToVisit({ trip }) {
 
    const [images, setImages] = useState({});

    useEffect(() => {
        if (trip) {
            fetchAllImages();
        }
    }, [trip]);

    const fetchAllImages = async () => {
        const newImages = {};

        for (const plan of trip?.tripData?.itinerary || []) {
            const { morning, afternoon, evening } = plan;
            try {
                if (morning?.placeName) {
                    const response = await GetPlaceImages(morning.placeName);
                    newImages[morning.placeName] = response.data.photos[0]?.src.landscape || '/image.png'; // Fallback image
                }
                if (afternoon?.placeName) {
                    const response = await GetPlaceImages(afternoon.placeName);
                    newImages[afternoon.placeName] = response.data.photos[0]?.src.landscape || '/image.png';
                }
                if (evening?.placeName) {
                    const response = await GetPlaceImages(evening.placeName);
                    newImages[evening.placeName] = response.data.photos[0]?.src.landscape || '/image.png';
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        }
        setImages(newImages);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className='font-bold text-2xl text-center mb-8'>
                Places To Visit
            </h2>

            <div>
                {trip?.tripData?.itinerary?.map((plan, index) => (
                    <div key={index} className="mb-10">
                        <h2 className='font-semibold text-xl text-gray-700 mb-4'>
                            Day {plan.day}
                        </h2>
                        <div className='my-3 space-y-5'>
                        
                            <div className='border rounded-xl p-5 flex gap-5 bg-white shadow-md hover:scale-105 transition-all'>
                                <div className="flex-shrink-0">
                                    <h2 className='font-medium text-sm text-orange-400 mb-2'>Morning</h2>
                                    <img 
                                        src={images[plan.morning?.placeName] || '/image.png'} 
                                        className='w-[100px] h-[100px] rounded-xl' 
                                        alt='morning-place' 
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h2 className='font-bold text-lg text-gray-800'>
                                        {plan?.morning.placeName}
                                    </h2>
                                    <p className="text-gray-600">
                                        🌏 {plan?.morning.placeDetails}
                                    </p>
                                    <p className="text-gray-600">
                                        💵 {plan?.morning.ticketPricing}
                                    </p>
                                    <p className='font-medium text-gray-600'>
                                        ⌚ {plan?.morning.timeToTravel}
                                    </p>
                                </div>
                                <div>
                                    <a
                                        href={`https://www.google.com/maps?q=${plan?.morning.placeName}`}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <Button><FaMapMarkedAlt /></Button>
                                    </a>
                                </div>
                            </div>

                            <div className='border rounded-xl p-5 flex gap-5 bg-white shadow-md hover:scale-105 transition-all'>
                                <div className="flex-shrink-0">
                                    <h2 className='font-medium text-sm text-orange-400 mb-2'>Afternoon</h2>
                                    <img 
                                        src={images[plan.afternoon?.placeName] || '/image.png'} 
                                        className='w-[100px] h-[100px] rounded-xl' 
                                        alt='afternoon-place' 
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h2 className='font-bold text-lg text-gray-800'>
                                        {plan?.afternoon.placeName}
                                    </h2>
                                    <p className="text-gray-600">
                                        🌏 {plan?.afternoon.placeDetails}
                                    </p>
                                    <p className="text-gray-600">
                                        💵 {plan?.afternoon.ticketPricing}
                                    </p>
                                    <p className='font-medium text-gray-600'>
                                        ⌚ {plan?.afternoon.timeToTravel}
                                    </p>
                                </div>
                                <div>
                                    <a
                                        href={`https://www.google.com/maps?q=${plan?.afternoon.placeName}`}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <Button><FaMapMarkedAlt /></Button>
                                    </a>
                                </div>
                            </div>

                            <div className='border rounded-xl p-5 flex gap-5 bg-white shadow-md hover:scale-105 transition-all'>
                                <div className="flex-shrink-0">
                                    <h2 className='font-medium text-sm text-orange-400 mb-2'>Evening</h2>
                                    <img 
                                        src={images[plan.evening?.placeName] || '/image.png'} 
                                        className='w-[100px] h-[100px] rounded-xl' 
                                        alt='evening-place' 
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h2 className='font-bold text-lg text-gray-800'>
                                        {plan?.evening.placeName}
                                    </h2>
                                    <p className="text-gray-600">
                                        🌏 {plan?.evening.placeDetails}
                                    </p>
                                    <p className="text-gray-600">
                                        💵 {plan?.evening.ticketPricing}
                                    </p>
                                    <p className='font-medium text-gray-600'>
                                        ⌚ {plan?.evening.timeToTravel}
                                    </p>
                                </div>
                                <div>
                                    <a
                                        href={`https://www.google.com/maps?q=${plan?.evening.placeName}`}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <Button><FaMapMarkedAlt /></Button>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlacesToVisit;
