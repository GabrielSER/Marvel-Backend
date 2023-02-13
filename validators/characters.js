const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");

const validateObjectDataUpdate = [
    check("name").exists().notEmpty(),
    (req, res, next) => {
      validateResult(req, res, next);
    },
  ];

  const validateId = [
    check("id").exists().isMongoId(),
    (req, res, next) => {
      validateResult(req, res, next);
    },
  ];
  

  module.exports = { validateId, validateObjectDataUpdate };
