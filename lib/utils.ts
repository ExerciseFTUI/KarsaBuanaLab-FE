import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetcher(url: string) {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data);
  }
  return JSON.parse(data);
}

export function rupiah(number: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
}

export function formatString(inputString: string) {
  // Replace underscores with spaces
  let stringWithSpaces = inputString.replace(/_/g, " ");

  // Capitalize the first letter of each word
  let formattedString = stringWithSpaces.replace(/\b\w/g, (match) =>
    match.toUpperCase()
  );

  return formattedString;
}
