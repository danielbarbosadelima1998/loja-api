/* eslint-disable class-methods-use-this */
const Category = require("../models/Categories");
const { generateToken } = require("../auth/authenticate");
const getError = require("../utils/getError")

const defaultOptions = {
  attributes: {
    exclude: [""],
  },
};

class CategoryController {
  async index(req, res) {
    const { query } = req;

    try {
      const response = await Category.findAndCountAll({
        ...defaultOptions,
        ...query,
      });
      // const count = Number(response.count);
      // const pages = Number(query.limit ? Math.ceil(count / query.limit) : 1);
      // const perPage = Number(query.limit || count);
      // const currentPage = Number(query.offset / perPage || 0);

      return res.status(200).json({
        data: response.rows,
        count: Number(response.count),
        // perPage,
        // currentPage,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async store(req, res) {
    const { body, query } = req;
    try {
      const response = await Category.create(body, query);

      const category = await Category.findByPk(response.id);

      category.password = undefined;

      return res.status(200).json({
        data: category,
        token: generateToken({ id: category.id }),
      });
    } catch (error) {
      return res.status(500).json({
        error: error.toString(),
      });
    }
  }

  async show(req, res) {
    const { id } = req.params;
    try {
      const response = await Category.findByPk(id, defaultOptions);
      return res.status(200).json({
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { body } = req;
    try {
      const isRecord = await Category.findByPk(id, defaultOptions);
      if (!isRecord) {
        return res.status(500).json({
          error: "Record not found!",
        });
      }
      await Category.update(body, { where: { id } });
      const response = await Category.findByPk(id, defaultOptions);
      return res.status(200).json({
        data: response,
      });
    } catch (error) {
      return res.status(409).json({
        error: getError(error),
      });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    try {
      const isRecord = await Category.findByPk(id, defaultOptions);
      if (!isRecord) {
        return res.status(500).json({
          error: "Record not found!",
        });
      }
      await Category.destroy({ where: { id } });
      return res.status(200).json(isRecord);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}

module.exports = new CategoryController();
