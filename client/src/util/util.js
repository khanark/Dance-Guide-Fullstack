export const formatDate = (val) => {
  const date = new Date(val);
  return date.toLocaleString("bg-BG", {
    day: "numeric",
    month: "long",
    year: "2-digit",
  });
};

export const danceTypeFormat = (val) => {
  const danceTypes = {
    1: "Класически балет",
    2: "Съвременни танци",
    3: "Ориенталски танци",
    4: "Народни танци",
    5: "Хип - Хоп танци",
    6: "Спортни танци",
    7: "Други",
  };
  return danceTypes[val];
};

export const setPageTitle = (title) => {
  document.title = `DanceGuide | ${title}`;
};

export const convertToPascalCase = (...args) => {
  if (args.some((arg) => arg === undefined || arg === null)) return;

  return args
    .join(" ")
    .split(" ")
    .map((w) => w.replace(w[0], w[0].toUpperCase()))
    .join(" ");
};
