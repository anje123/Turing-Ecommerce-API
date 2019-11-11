import jwt from "jsonwebtoken";
import Joi from "@hapi/joi";
import request from "request";
import model from "../models";
const { Customer } = model;

class Customers {
  static async postCustomers(req, res) {
    const { name, email, password } = req.body;
    // validate
    const schema = {
      name: Joi.string()
        .alphanum()
        .max(50)
        .required(),
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required()
    };

    const { error } = Joi.validate(req.body, schema);
    if (error) return res.status(400).send(error.details[0].message);

    // create
    const emailExist = await Customer.findOne({ where: { email: email } });
    if (emailExist)
      return res.status(400).send({
        error: {
          status: 400,
          code: "USR_04",
          message: "The email already exist.",
          field: "email"
        }
      });
    const created_customer = await Customer.create({
      name,
      email,
      password
    });
    const Token = jwt.sign(
      { name: name, email: email, customer_id: created_customer.customer_id },
      "123",
      { expiresIn: "24h" }
    );
    const customer = await Customer.findOne({
      where: { customer_id: created_customer.customer_id },
      attributes: { exclude: ["password"] }
    });

    const accessToken = `Bearer ${Token}`;

    res
      .status(200)
      .header("USER-KEY", accessToken)
      .send({ customer, accessToken, expiresIn: "24h" });
  }
  // strict_check
  static async loginCustomer(req, res) {
    const { email, password } = req.body;
    const schema = {
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required()
    };

    // created
    const { error } = Joi.validate(req.body, schema);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findOne({ where: { email: email } });
    if (!customer) {
      return res.status(400).send({
        error: {
          status: 400,
          code: "USR_04",
          message: "invalid email or  password"
        }
      });
    }
    const Token = jwt.sign({ name: customer.name, email: email }, "123", {
      expiresIn: "24h"
    });

    if (password !== customer.password) {
      return res.status(400).send({
        error: {
          status: 400,
          code: "USR_04",
          message: "invalid email or password"
        }
      });
    }

    const accessToken = `Bearer ${Token}`;

    res
      .status(200)
      .header("USER-KEY", accessToken)
      .send({ customer, accessToken, expiresIn: "24h" });
  }

  static async getCustomer(req, res) {
    const customer = await Customer.findOne({
      where: { customer_id: req.user.customer_id },
      attributes: { exclude: ["password"] }
    });
    if (!customer) return res.status(404).send("customer cannot be found");
    res.send(customer);
  }

  static async updateCustomer(req, res) {
    const { name, email, password, day_phone, eve_phone, mob_phone } = req.body;
    // validate
    const schema = {
      name: Joi.string()
        .alphanum()
        .max(50)
        .required(),
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
      day_phone: Joi.string(),
      eve_phone: Joi.string(),
      mob_phone: Joi.string()
    };

    const { error } = Joi.validate(req.body, schema);
    if (error) return res.status(400).send(error.details[0].message);
    //create
    const selected_customer = await Customer.findByPk(req.user.customer_id);
    const updated_customer = await selected_customer.update({
      name,
      email,
      password,
      day_phone,
      eve_phone,
      mob_phone
    });
    const customer = await Customer.findAll({
      where: { customer_id: updated_customer.customer_id },
      attributes: { exclude: ["password"] }
    });

    res.send(customer);
  }

  static async updateCustomerAddress(req, res) {
    const {
      address_1,
      address_2,
      city,
      region,
      postal_code,
      country,
      shipping_region_id
    } = req.body;
    const schema = {
      address_1: Joi.string().required(),
      address_2: Joi.string(),
      city: Joi.string().required(),
      region: Joi.string().required(),
      postal_code: Joi.string().required(),
      country: Joi.string().required(),
      shipping_region_id: Joi.number()
        .integer()
        .required()
    };

    const { error } = Joi.validate(req.body, schema);
    if (error) return res.status(400).send(error.details[0].message);

    // create
    const selected_customer = await Customer.findByPk(req.user.customer_id);
    const updated_customer = await selected_customer.update({
      address_1,
      address_2,
      city,
      region,
      postal_code,
      country,
      shipping_region_id
    });
    const customer = await Customer.findAll({
      where: { customer_id: updated_customer.customer_id },
      attributes: { exclude: ["password"] }
    });

    res.send(customer);
  }

  static async updateCustomerCreditCard(req, res) {
    const { credit_card } = req.body;
    const schema = {
      credit_card: Joi.string().required()
    };

    const { error } = Joi.validate(req.body, schema);
    if (error) return res.status(400).send(error.details[0].message);

    //create
    const selected_customer = await Customer.findByPk(req.user.customer_id);
    const updated_customer = await selected_customer.update({ credit_card });
    const customer = await Customer.findAll({
      where: { customer_id: updated_customer.customer_id },
      attributes: { exclude: ["password"] }
    });

    res.send(customer);
  }

  // strict check
  static async facebookSignIn(req, res) {
    const facebook_access_token = req.body.access_token;

    if (!facebook_access_token)
      return res.status(400).send({
        code: "USR_02",
        message: "The access token is empty.",
        field: "access token",
        status: "400"
      });

    let path = `https://graph.facebook.com/me?access_token${facebook_access_token}`;

    request(path, async (error, respose, body) => {
      let data = JSON.parse(body);
      // eslint-disable-next-line prettier/prettier
      if (error && !response && !response.statusCode && response.statusCode != 200) 
        return res.status(403).send({
          error: {
            status: 403,
            code: "AUT_02",
            message: "Access Forbidden",
            field: "NoAuth"
          }
        });

      if (data && data.id)
        return res.status(400).send({
          code: "USR_02",
          message: "Access Forbidden.",
          status: "403"
        });

      const emailExist = await Customer.findOne({
        where: { email: data.email }
      });

      if (emailExist)
        return res.status(400).send({
          error: {
            status: 400,
            code: "USR_04",
            message: "The email already exist.",
            field: "email"
          }
        });

      const created_customer = await Customer.create({
        name: data.name,
        email: data.email,
        password: data.password
      });
      const Token = jwt.sign(
        {
          name: data.name,
          email: data.email,
          customer_id: created_customer.customer_id
        },
        "123",
        { expiresIn: "24h" }
      );
      const customer = await Customer.findOne({
        where: { customer_id: created_customer.customer_id },
        attributes: { exclude: ["password"] }
      });

      const accessToken = `Bearer ${Token}`;

      res
        .status(200)
        .header("USER-KEY", accessToken)
        .send({ customer, accessToken, expiresIn: "24h" });
    });
  }
}

export default Customers;
