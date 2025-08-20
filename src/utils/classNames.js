const classNames = (obj) => Object.entries(obj)
    .filter(([key, value]) => Boolean(value))
    .map(([key]) => key)
    .join(' ');

export default classNames;