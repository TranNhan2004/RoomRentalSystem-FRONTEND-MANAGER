import Link from 'next/link';
import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = (props: NavLinkProps) => {
  return (
    <>
      <Link 
        href={props.href} 
        className={`text-[15px] text-white hover:text-mylightgreen hover:text-base p-2 block ${props.className}`}
      >
        {props.children}
      </Link>
    </>
  );
};

export default NavLink;
