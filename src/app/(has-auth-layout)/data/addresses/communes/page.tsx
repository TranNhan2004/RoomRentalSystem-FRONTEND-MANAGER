'use client';

import Title from "@/components/data/Title";
import { useEffect } from "react";

export default function CommunesPage() {
  useEffect(() => {
    document.title = "Management | Communes";
  }, []);

  return (
    <div>
      <Title>Dữ liệu cấp xã</Title>

    </div>
  );
}