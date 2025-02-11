'use client';

import Filter from "@/components/data/Filter";
import InputSearch from "@/components/data/InputSearch";
import Sorting from "@/components/data/Sorting";
import Table from "@/components/data/Table";
import Title from "@/components/data/Title";
import ProvinceType from "@/interfaces/address/Province.interface";
import ProvinceService from "@/services/address/Province.service";
import { useEffect, useState } from "react";

export default function ProvincesPage() {
  const [data, setData] = useState<ProvinceType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const provinces = await ProvinceService.getMany();
      setData(provinces);
    };

    fetchData();
  }, []);

  const generateDataForTable = () => {
    const dataForTable = [];
    for (const item of data) {
      dataForTable.push({
        id: `${item.id}`,
        display: `${item.name}`
      });
    }
    return dataForTable;
  };

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

      <Table 
        data={generateDataForTable()}
      />

    </div>
  );
}