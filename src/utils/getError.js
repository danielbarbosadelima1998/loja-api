const getError = (e) => e.errors.map((err) => err.message);

module.exports = getError;
