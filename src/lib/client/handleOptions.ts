import { OptionType } from "@/components/partial/form/Select";

export const mapOptions = <T extends object>(data: T[], labelKey: keyof T, valueKey: keyof T): OptionType[] => {
  return data.map(item => ({
    label: item[labelKey] as string ?? '',
    value: item[valueKey] as string ?? '',
  }));
};