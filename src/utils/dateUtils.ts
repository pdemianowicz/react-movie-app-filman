export function formatDate(
  dateString: string | Date | null | undefined,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
  locale: string = "en-US"
): string {
  if (!dateString) return "N/A";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date!";
    return date.toLocaleDateString(locale, options);
  } catch {
    return "Invalid Date!";
  }
}

export const DATE_FORMATS = {
  full: { year: "numeric", month: "long", day: "numeric" } as const, // October 28, 1967
  short: { year: "numeric", month: "short", day: "numeric" } as const, // Oct 28, 1967
  numeric: { year: "numeric", month: "2-digit", day: "2-digit" } as const, // 10/28/1967
  year: { year: "numeric" } as const, // 1967
} as const;

export function calculateAge(birthday: string | Date | null | undefined): number | null {
  if (!birthday) return null;

  try {
    const birthDate = new Date(birthday);
    if (isNaN(birthDate.getTime())) return null;

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  } catch {
    return null;
  }
}

export function formatRuntime(minutes: number): string {
  if (!minutes) return "";
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}
