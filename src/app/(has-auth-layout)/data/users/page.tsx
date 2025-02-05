'use client';

import AddButton from "@/components/button/AddButton";
import CancelButton from "@/components/button/CancelButton";
import DeleteButton from "@/components/button/DeleteButton";
import EditButton from "@/components/button/EditButton";
import SaveButton from "@/components/button/SaveButton";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [randomText, setRandomText] = useState('');

  useEffect(() => {
    setRandomText(faker.lorem.paragraph(100));
  }, []);

  return (
    <div>
      <h1>Users Page</h1>
      <p>This is the Users Page.</p>
      <div className="text-justify">{randomText}</div>

      <EditButton onClick={() => console.log('Edit button')}/><br />
      <AddButton onClick={() => console.log('Add button')} /><br />
      <CancelButton onClick={() => console.log('Cancel button')} /><br />
      <DeleteButton onClick={() => console.log('Delete button')} /><br />
      <SaveButton onClick={() => console.log('Save button')} />
    </div>
  );
}