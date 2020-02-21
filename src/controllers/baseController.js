const express = require('express');

const defaultOptions = {
  attributes: {
    exclude: ['password'],
  },
};

class baseController {
  constructor(path, model) {
    this.path = path;
    this.model = model;
    this.url = `${process.env.URL}${this.path}`;
  }

  async index(req, res) {
    try {
      const response = await this.model.findAll(defaultOptions);
      return res.status(200).json({
        data: response,
        content: {
          type: 'GET',
          url: this.url,
        },
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        content: {
          type: 'GET',
          url: this.url,
        },
      });
    }
  }

  async store(req, res) {
    const { body } = req;
    try {
      const response = await this.model.create(body, defaultOptions);
      return res.status(200).json({
        data: response,
        content: {
          type: 'POST',
          url: this.url,
        },
      });
    } catch (error) {
      return res.status(500).json({
        error: error.toString(),
        content: {
          type: 'POST',
          url: this.url,
        },
      });
    }
  }

  async show(req, res) {
    const { id } = req.params;
    try {
      const response = await this.model.findByPk(id, defaultOptions);
      return res.status(200).json({
        data: response,
        content: {
          type: 'GET',
          url: `${this.url}/${id}`,
        },
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        content: {
          type: 'GET',
          url: `${this.url}/${id}`,
        },
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { body } = req;
    try {
      const isRecord = await this.model.findByPk(id, defaultOptions);
      if (!isRecord) {
        return res.status(500).json({
          error: 'Record not found!',
          content: {
            type: 'PUT',
            url: `${this.url}/${id}`,
          },
        });
      }
      await this.model.update(body, { where: { id } });
      const response = await this.model.findByPk(id, defaultOptions);
      return res.status(200).json({
        data: response,
        content: {
          type: 'PUT',
          url: `${this.url}/${id}`,
        },
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Record not found!',
        content: {
          type: 'PUT',
          url: `${this.url}/${id}`,
        },
      });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    try {
      const isRecord = await this.model.findByPk(id, defaultOptions);
      if (!isRecord) {
        return res.status(500).json({
          error: 'Record not found!',
          content: {
            type: 'DELETE',
            url: `${this.url}/${id}`,
          },
        });
      }
      await this.model.destroy({ where: { id } });
      return res.sendStatus(200);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        content: {
          type: 'DELETE',
          url: `${this.url}/${id}`,
        },
      });
    }
  }

  routes() {
    const route = express.Router();

    route.get(this.path, this.index.bind(this));
    route.get(`${this.path}/:id`, this.show.bind(this));
    route.post(this.path, this.store.bind(this));
    route.delete(`${this.path}/:id`, this.destroy.bind(this));
    route.put(`${this.path}/:id`, this.update.bind(this));
    return route;
  }
}
module.exports = baseController;
