import { formatDate } from "./formatDate";

const today = new Date();
export const dateStrOfMinAge = formatDate(new Date(today.setFullYear(today.getFullYear() - 15)), 'ymd');
export const dateStrOfMaxAge = formatDate(new Date(today.setFullYear(today.getFullYear() - 120)), 'ymd');