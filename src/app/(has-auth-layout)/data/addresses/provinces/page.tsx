'use client';

import Title from "@/components/data/Title";
import { useEffect } from "react";

export default function ProvincesPage() {
  useEffect(() => {
    document.title = "Management | Provinces";
  }, []);

  return (
    <div>
      <Title>Dữ liệu cấp tỉnh</Title>
    </div>
  );
}