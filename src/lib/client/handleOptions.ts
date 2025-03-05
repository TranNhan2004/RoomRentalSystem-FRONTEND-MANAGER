import { OptionType } from "@/components/partial/form/Select";


export const mapOptions = <T extends object>(data: T[], labelKeys: (keyof T)[], valueKey: keyof T): OptionType[] => {
  return data.map(item => {
    let label = '';
    labelKeys.forEach(labelKey => {
      label += item[labelKey] as string + '-';
    });
    
    return {
      label: label.slice(0, -1),
      value: item[valueKey] as string ?? '',
    };
  });
};