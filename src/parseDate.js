const parseDate = (dateRaw = new Date()) => {
  const time = `${dateRaw.getHours()}:${dateRaw.getMinutes()}:${dateRaw.getSeconds()}`;
  let date = dateRaw.toLocaleDateString();

  return {time, date};
};

export default parseDate;
