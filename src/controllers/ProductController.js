/* eslint-disable class-methods-use-this */
const Product = require("../models/Products");
const { generateToken } = require("../auth/authenticate");

const defaultOptions = {
  attributes: {
    exclude: [""],
  },
};

class ProductController {
  async index(req, res) {
    const { query } = req;

    try {
      const response = await Product.findAndCountAll({
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
      const response = await Product.create(body, query);

      const product = await Product.findByPk(response.id);

      product.password = undefined;

      return res.status(200).json({
        data: product,
        token: generateToken({ id: product.id }),
      });
    } catch (error) {
      return res.status(500).json({
        error: error.toString(),
      });
    }
  }

  async show(req, res) {
    const { id } = req.params;
    const { query } = req;

    try {
      const response = await Product.findByPk(id, {
        ...defaultOptions,
        ...query,
      });
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
      const isRecord = await Product.findByPk(id, defaultOptions);
      if (!isRecord) {
        return res.status(500).json({
          error: "Record not found!",
        });
      }
      await Product.update(body, { where: { id } });
      const response = await Product.findByPk(id, defaultOptions);
      return res.status(200).json({
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Record not found!",
      });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    try {
      const isRecord = await Product.findByPk(id, defaultOptions);
      if (!isRecord) {
        return res.status(500).json({
          error: "Record not found!",
        });
      }
      await Product.destroy({ where: { id } });
      return res.sendStatus(200);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}

module.exports = new ProductController();
