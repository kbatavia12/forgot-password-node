const generateCode = () => {
    min = Math.ceil(100000);
    max = Math.floor(999999);
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
    generateCode
};