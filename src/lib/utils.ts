import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ko } from "date-fns/locale";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return format(new Date(date), "yyyy년 M월 d일", { locale: ko });
}
