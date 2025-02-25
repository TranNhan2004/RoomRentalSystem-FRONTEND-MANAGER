'use client';

import { useState } from 'react';
import { NavLink } from './NavLink';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

type DropdownMenuProps = {
  label: string;
  links: { 
    label: string; 
    href: string; 
  }[];
}

export const DropdownMenu = (props: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const getLinksInTSX = () => {
    return props.links.map((link, index) => (
      <li key={index} className='flex items-center ml-[5%]'>
        <ChevronRightIcon className='w-4 h-4' color='white' />
        <NavLink href={link.href}>{link.label}</NavLink>
      </li>
    ));
  };

  return (
    <>
      <button
        onClick={toggleDropdown}
        className='text-white text-left p-2 hover:text-mylightgreen hover:text-lg'
      >
        <div className='flex items-center'>
          <p className='text-[15px] mr-2'>{props.label}</p>
          <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDownIcon className='w-4 h-4' color='white' />
          </div>
        </div> 
      </button>
      {
        isOpen && (
          <div className='left-0 w-48 ml-[2%] mb-[-8%]'>
            <ul className='space-y-2 py-2'>
              {getLinksInTSX()}
            </ul>
          </div>
        )
      }
    </>
  );
};