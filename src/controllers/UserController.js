/* eslint-disable class-methods-use-this */
const User = require("../models/Users");
const { generateToken } = require("../auth/authenticate");

const defaultOptions = {
  attributes: {
    exclude: ["password"],
  },
};

class UserController {
  async index(req, res) {
    const { query } = req;

    try {
      const response = await User.findAndCountAll({
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
      const response = await User.create(body, query);

      const user = await User.findByPk(response.id);

      user.password = undefined;

      return res.status(200).json({
        data: user,
        token: generateToken({ id: user.id }),
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
      const response = await User.findByPk(id, defaultOptions);
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
      const isRecord = await User.findByPk(id, defaultOptions);
      if (!isRecord) {
        return res.status(500).json({
          error: "Record not found!",
        });
      }
      await User.update(body, { where: { id } });
      const response = await User.findByPk(id, defaultOptions);
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
      const isRecord = await User.findByPk(id, defaultOptions);
      if (!isRecord) {
        return res.status(500).json({
          error: "Record not found!",
        });
      }
      await User.destroy({ where: { id } });
      return res.sendStatus(200);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({
        where: { username },
      });

      if (!user) {
        return res.status(500).json({
          error: "User not found!",
        });
      }

      if (password !== user.password) {
        return res.status(500).json({
          error: "Invalid password!",
        });
      }

      user.password = undefined;

      return res.status(200).json({
        data: user,
        token: generateToken({ id: user.id }),
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}

module.exports = new UserController();
