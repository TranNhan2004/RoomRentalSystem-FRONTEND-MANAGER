'use client';

import BaseUserType from "@/interfaces/user-account/User.interface";
import formatDate from "@/lib/formatDate";
import BaseUserService from "@/services/user-account/User.service";
import Image from "next/image";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";


export default function BaseUserDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [baseUser, setBaseUser] = useState<BaseUserType>({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    citizenNumber: "",
    phoneNumber: "",
    dateOfBirth: new Date(),
    gender: "M",
    avatar: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  useEffect(() => {
    const fetchData = async () => {
      const user = await BaseUserService.get(id);
      setBaseUser(user);
    };

    fetchData();
  }, [id]);
  
  return (
    <div>
      <h1>Base User Detail Page</h1>
      <ul>
        <li>ID: {baseUser.id}</li>
        <li>Email: {baseUser.email}</li>
        <li>Fullname: {baseUser.firstName + ' ' + baseUser.lastName}</li>
        <li>Citizen number: {baseUser.citizenNumber}</li>
        <li>Phone number: {baseUser.phoneNumber}</li>
        <li>Date of birth: {formatDate(baseUser.dateOfBirth, 'dmy')}</li>
        <li>Gender: {baseUser.gender}</li>
        <li>
          Avatar: 
          <Image 
            src={baseUser.avatar ?? '/avatar.svg' }
            alt="User avatar"
            width={30}
            height={30}
          />
        </li>
        <li>Created at: {formatDate(baseUser.createdAt, 'dmy')}</li>
        <li>Updated at: {formatDate(baseUser.updatedAt, 'dmy')}</li>
      </ul>
    </div>
  );
}