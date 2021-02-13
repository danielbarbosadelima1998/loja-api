module.exports = (rules = []) => (req, res, next) => {
  const rulesWithErrors = rules.filter(([label, validation]) =>
    validation.fn(req.body[label])
  );

  return rulesWithErrors.length
    ? res.status(500).json({ errors: rulesWithErrors })
    : next();
};
