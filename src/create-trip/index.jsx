import React, { useState } from 'react';
import { AddressAutofill } from '@mapbox/search-js-react';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog.jsx';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options.jsx';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModel.jsx';
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig.jsx"
import { useNavigate } from 'react-router-dom';
function CreateTrip() {
  const [place, setPlace] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    days: '',
    budget: '',
    companions: ''
  });

  const navigate = useNavigate();

  // Handle change for input fields
  const handleInputChange = (name, value) => {
    if (name === 'days' && value > 5) {
      alert('You cannot plan a trip for more than 5 days.');
      return;
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChange = (e) => {
    setPlace(e.target.value);
    handleInputChange('destination', e.target.value); // Update destination in formData
    console.log("Selected place:", e.target.value);
  };

  const handleDaysChange = (e) => {
    handleInputChange('days', e.target.value);
  };

  const handleOptionClick = (field, value) => {
    handleInputChange(field, value);
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse); // Log the response for debugging
      GetUserProfile(tokenResponse); // Call function to get user profile
    },
    onError: (error) => console.log(error),
  });

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (!formData?.days || !formData.destination || !formData.budget || !formData.companions) {
      toast("Please fill all the detials")
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.destination)
      .replace('{totalDays}', formData?.days)
      .replace('{companions}', formData?.companions)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.days)

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);
    navigate('/view-trip/'+docId);
  }
  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.accessToken}`,
        Accept: `Application/json`
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      handleSubmit();
    })
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='text-3xl font-bold text-[#333333] mb-4'>
        Tell us your travel preferences
      </h2>
      <p className='mt-3 text-xl text-[#333333]'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>
      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 text-[#333333] font-medium'>
            What is the destination of your choice?
          </h2>
          <form onSubmit={handleSubmit}>
            <AddressAutofill accessToken={import.meta.env.VITE_MAPBOX_API_KEY}>
              <input
                className='w-full p-2 border rounded'
                autoComplete="shipping address-line1"
                value={place}
                onChange={handleChange}
                placeholder="Enter your destination"
              />
            </AddressAutofill>
          </form>
        </div>

        <div>
          <h2 className='text-xl my-3 text-[#333333] font-medium'>
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            value={formData.days}
            max={5} // Set the max attribute to 5
            onChange={(e) => handleInputChange('days', e.target.value)}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 text-[#333333] font-medium'>
            What is your budget?
          </h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow
                  ${formData?.budget == item.title && 'shadow-lg border-black'}
                `}
                onClick={() => handleOptionClick('budget', item.title)}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-[#333333]'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 text-[#333333] font-medium'>
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow
                  ${formData?.companions == item.title && 'shadow-lg border-black'}
                  `}
                onClick={() => handleOptionClick('companions', item.title)}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-[#333333]'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button disabled={loading} onClick={handleSubmit}>
          {loading ?
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/> : 'Generate Trip'
          }
        </Button>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            {/* Adding DialogTitle for better semantics */}
            <DialogTitle>
              <div className='flex items-center'>
                <img src='/logo.svg' alt='Logo' className='h-10 w-10' />
                <h2 className='font-bold text-lg ml-3'>Sign In</h2>
              </div>
            </DialogTitle>
            <DialogDescription>
              {/* Moved DialogDescription below DialogTitle for clarity */}
              <p className='mt-2 text-gray-600'>
                Sign in to the App with Google authentication securely
              </p>
              <Button onClick={login} className='w-full mt-5 flex gap-3 items-center justify-center'>
                <FcGoogle className='h-6 w-6' />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default CreateTrip;