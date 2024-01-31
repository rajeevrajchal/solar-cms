export function getInitialsName(name: string): string {
  const words: string[] = name.split(" ");
  const firstInitial: string = words[0] ? words[0][0].toUpperCase() : "";
  const lastInitial: string =
    words.length > 1 ? words[words.length - 1][0].toUpperCase() : "";
  const initials: string = `${firstInitial}${lastInitial}`;
  return initials;
}
