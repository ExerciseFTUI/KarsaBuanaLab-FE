import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
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

/**
 * @param {{ from: String; to: String }} date
 * @returns formatted date or date range
 * @author Den
 * @description Function to format 'Date' data type from project backend to a usable formatted date in frontend
 * @example
 * const project = data.project;
 * const jadwal = formatDateFromBackend(project?.jadwal_sampling);
 *
 * console.log(jadwal) // "May 11, 2024" or "May 11, 2024 - June 13, 2024"
 */
export function formatDateFromBackend(
  date: { from: String; to: String } | undefined
) {
  let jadwal = !!date ? date : { from: "", to: "" };

  if (!jadwal) return null;

  let from = !!jadwal.from ? jadwal.from.split("-").reverse() : null;
  let to = !!jadwal.to ? jadwal.to.split("-").reverse() : null;

  let formattedJadwal: { from: Date | null; to: Date | null } = {
    from: null,
    to: null,
  };

  if (from)
    formattedJadwal.from = new Date(
      parseInt(from[0]),
      parseInt(from[1]) - 1,
      parseInt(from[2])
    );

  if (to)
    formattedJadwal.to = new Date(
      parseInt(to[0]),
      parseInt(to[1]) - 1,
      parseInt(to[2])
    );

  if (!formattedJadwal) return null;

  return !!formattedJadwal.from
    ? !!formattedJadwal.to
      ? `${format(formattedJadwal.from, "LLL dd, y")} - 
        ${format(formattedJadwal.to, "LLL dd, y")}`
      : format(formattedJadwal.from, "LLL dd, y")
    : null;
}
