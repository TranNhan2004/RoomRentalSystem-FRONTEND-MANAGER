'use client';

import Title from "@/components/data/Title";
import { useEffect } from "react";

export default function DistrictsPage() {
  useEffect(() => {
    document.title = "Management | Districts";
  }, []);

  return (
    <div>
      <Title>Dữ liệu cấp huyện</Title>
    </div>
  );
}