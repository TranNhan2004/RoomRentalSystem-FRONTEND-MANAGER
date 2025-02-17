'use client';

import Form from "@/components/minor/form/Form";
import Input from "@/components/minor/form/Input";
import Label from "@/components/minor/form/Label";
import BaseUserType from "@/interfaces/user-account/User.interface";
import { handleInputChange } from "@/lib/client/handleInputChange";
import formatDate from "@/lib/client/formatDate";
import BaseUserService from "@/services/user-account/User.service";
import { useState } from "react";

export default function NewBaseUsersPage() {
  const [baseUser, setBaseUser] = useState<BaseUserType>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await BaseUserService.post(baseUser);
      alert("Base User created successfully!");
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };

  return (
    <div>
      <h1>Base Users Page</h1>
      <Form title="Post Base User" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email" name="Email" />
          <Input 
            id="email"
            type="email"
            name="email"
            value={baseUser.email}
            onChange={(e) => handleInputChange(e, setBaseUser)}
          />
        </div>

        <div>
          <Label htmlFor="password" name="Password" />
          <Input 
            id="password"
            type="password"
            name="password"
            value={baseUser.password}
            onChange={(e) => handleInputChange(e, setBaseUser)}
          />
        </div>

        <div>
          <Label htmlFor="first-name" name="First name" />
          <Input 
            id="first-name"
            type="text"
            name="firstName"
            value={baseUser.firstName}
            onChange={(e) => handleInputChange(e, setBaseUser)}
          />
        </div>

        <div>
          <Label htmlFor="last-name" name="Last name" />
          <Input 
            id="last-name"
            type="text"
            name="lastName"
            value={baseUser.lastName}
            onChange={(e) => handleInputChange(e, setBaseUser)}
          />
        </div>

        <div>
          <Label htmlFor="citizen-number" name="Citizen number" />
          <Input 
            id="citizen-number"
            type="text"
            name="citizenNumber"
            value={baseUser.citizenNumber}
            onChange={(e) => handleInputChange(e, setBaseUser)}
          />
        </div>

        <div>
          <Label htmlFor="phone-number" name="Phone number" />
          <Input 
            id="phone-number"
            type="tel"
            name="phoneNumber"
            value={baseUser.phoneNumber}
            onChange={(e) => handleInputChange(e, setBaseUser)}
          />
        </div>

        <div>
          <Label htmlFor="date-of-birth" name="Date of birth" />
          <Input 
            id="date-of-birth"
            type="date"
            name="dateOfBirth"
            value={formatDate(baseUser.dateOfBirth, 'ymd')}
            onChange={(e) => handleInputChange(e, setBaseUser)}
          />
        </div>

        <div>
          <Label htmlFor="gender" name="Gender" />
          <Input 
            id="gender"
            type="text"
            name="gender"
            value={baseUser.gender}
            onChange={(e) => handleInputChange(e, setBaseUser)}
          />
        </div>

        <div>
          <Label htmlFor="avatar" name="Avatar" />
          <Input
            id="avatar"
            type="file"
            name="avatar"
            onChange={(e) => handleInputChange(e, setBaseUser)}
          />
        </div>
      </Form>
    </div>
  );
}