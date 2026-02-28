export const StringFormatService = {
  format: (value: string) => {
    return value.trim().toLowerCase();
  },
  formatName: (value: string) => {
    return value.trim().toLowerCase();
  },
  formatLocation: (value: string) => {
    return value.trim().toLowerCase();
  },
  formatDate: (value: string) => {
    return value.trim().toLowerCase();
  },
  capitalizeName: (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  },
};
