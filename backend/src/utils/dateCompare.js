const dateCompare = (comparisonDate) => {
    const dateNow = new Date();
    return dateNow < comparisonDate;
};

module.exports = { dateCompare };
