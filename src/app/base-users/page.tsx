'use client';

import BaseUserType from "@/interfaces/user-account/User.interface";
import BaseUserService from "@/services/user-account/User.service";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function BaseUsersPage() {
  const [baseUsers, setBaseUsers] = useState<BaseUserType[]>([]);

  const fetchData = async () => {
    const users = await BaseUserService.getMany();
    setBaseUsers(users);
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div>
      <h1>Base Users Page</h1>
      {
        baseUsers.map((baseUser) => (
          <div key={baseUser.id}>
            <Link href={`base-users/${baseUser.id}`}>
              {baseUser.id}
            </Link>
          </div>
        ))
      }
    </div>
  );
}