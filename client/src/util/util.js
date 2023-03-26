export const formatDate = val => {
  const date = new Date(val);
  return date.toLocaleDateString("bg-BG", {
    day: "numeric",
    month: "long",
    year: "2-digit",
  });
};
