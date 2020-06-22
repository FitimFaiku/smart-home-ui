export const classy = (classNameArray: (string | null)[]): string => classNameArray.filter(className => className).join(' ');
