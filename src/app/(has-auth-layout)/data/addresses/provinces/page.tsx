'use client';

import Filter from "@/components/data/Filter";
import InputSearch from "@/components/data/InputSearch";
import Sorting from "@/components/data/Sorting";
import Title from "@/components/data/Title";
import { useEffect } from "react";

export default function ProvincesPage() {
  useEffect(() => {
    document.title = "Management | Provinces";
  }, []);

  const onSearch = (searchQuery: string) => {
    console.log(`Search query: ${searchQuery}`);
  };

  const onSort = (optionValue: string) => {
    console.log(`Sort by: ${optionValue}`);
  };

  const onFilter = (selectedFilters: string[]) => {
    console.log(`Filter by category ${selectedFilters}`);
  };

  return (
    <div>
      <Title>Dữ liệu cấp tỉnh</Title>
      <div className="flex items-center">
        <InputSearch 
          placeholder="Tìm kiếm theo tên tỉnh"
          onSearch={onSearch}
        />
        <Sorting 
          options={[
            { label: 'Tên tỉnh (A-Z)', value: 'inc-name' },
            { label: 'Tên tỉnh (Z-A)', value: 'dec-name' },
          ]}
          onSort={onSort}
        />
        <Filter 
          onFilter={onFilter}
          filterOptions={[
            { category: 'ABC', options: ['a', 'b', 'c'] },
            { category: 'DEF', options: ['d', 'e', 'f'] },
            { category: 'GHI', options: ['g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's'] },
          ]}
        />
      </div>
    </div>
  );
}