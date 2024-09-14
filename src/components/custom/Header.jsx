import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function Header() {

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    console.log(user);
  })

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <img src='/logo.svg' alt='logo'></img>
      <div>
        {user ?
          <div className='flex items-center gap-3'>
            <Button varian='outline'>My Trips</Button>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} alt="user profile picture" className='h-[35px] w-[35px] rounded-full' />
              </PopoverTrigger>
              <PopoverContent>Place content for the popover here.</PopoverContent>
            </Popover>
          </div>
          :
          <Button className="ml-auto">Sign in</Button>
        }

      </div>
    </div>
  )
}

export default Header