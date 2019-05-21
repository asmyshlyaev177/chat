const parseDate = date => {
  const messageOld = new Date().getDate() - date.getDate();

  switch (messageOld) {
    case 0:
      return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    case 1:
      return "Yesterday";
    default:
      return `${date.toLocaleString()}`;
  }
};

export default parseDate;
