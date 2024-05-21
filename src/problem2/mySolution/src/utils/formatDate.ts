export const formatDate = (inputDate: string): string => {
  const date = new Date(inputDate);
  const day: string = date.getDate().toString().padStart(2, "0");
  const month: string = (date.getMonth() + 1).toString().padStart(2, "0");
  const year: number = date.getFullYear();

  return `${day}-${month}-${year}`;
};
