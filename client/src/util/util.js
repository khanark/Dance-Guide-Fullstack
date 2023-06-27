export const formatDate = (val) => {
    const date = new Date(val);
    return date.toLocaleString('en-US', {
        day: 'numeric',
        month: 'long',
        year: '2-digit',
    });
};

export const danceTypeFormat = (val) => {
    const danceTypes = {
        1: 'Classic dance',
        2: 'Modern dance',
        3: 'Oriental dance',
        4: 'Folklore dance',
        5: 'Hip - Hop dance',
        6: 'Sport dance',
        7: 'Other',
    };
    return danceTypes[val];
};

export const setPageTitle = (title) => {
    document.title = `DanceGuide | ${title}`;
};

export const convertToPascalCase = (...args) => {
    if (args.some((arg) => arg === undefined || arg === null)) {
        return;
    }

    return args
        .join(' ')
        .split(' ')
        .map((w) => w.replace(w[0], w[0].toUpperCase()))
        .join(' ');
};

export const matchLink = (link) => {
    const regex = /https?:\/\/(.*?)(\/|$)/;
    if (!link) {
        return;
    }
    const result = regex.exec(link);
    return result[1] || 'no external link';
};
