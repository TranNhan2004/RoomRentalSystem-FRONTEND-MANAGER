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

  const onFilter = (selectedFilters: Set<string>) => {
    selectedFilters.forEach((filter) => {
      console.log(`Filter by ${filter}`);
    });
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
          filterOptionsGroups={[
            { 
              category: 'ABC', 
              options: [
                { label: 'a', value: 'a' },
                { label: 'b', value: 'b' },
                { label: 'c', value: 'c' },
              ]
            },
            { 
              category: 'DEF', 
              options: [
                { label: 'd', value: 'd' },
                { label: 'e', value: 'e' },
                { label: 'f', value: 'f' },
              ] 

            },
            { 
              category: 'GHI', 
              options: [
                { label: 'g', value: 'g' },
                { label: 'h', value: 'h' },
                { label: 'i', value: 'i' },
                { label: 'j', value: 'j' },
                { label: 'k', value: 'k' },
                { label: 'l', value: 'l' },
                { label: 'm', value: 'm' },
                { label: 'n', value: 'n' },
                { label: 'o', value: 'o' },
                { label: 'p', value: 'p' },
                { label: 'q', value: 'q' },
                { label: 'r', value: 'r' },
                { label: 's', value: 's' },
                { label: 't', value: 't' },
              ]  
            },
          ]}
        />
      </div>
    </div>
  );
}