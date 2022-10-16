export const returnRandomItemInArray = (obj) => {
  const index = Math.round((obj.length - 1) * Math.random());
  return obj[index];
};

export const returnGridSize = (scoreboardArray, filterCriteria) => {
  return (
    scoreboardArray.reduce(
      (total, i) => (i === filterCriteria ? total + 1 : total),
      0
    ) * 3
  );
};
