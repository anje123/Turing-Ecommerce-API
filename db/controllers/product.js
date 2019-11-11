import model, { sequelize } from "../models";
import Joi from "@hapi/joi";
const { Product } = model;
const { Category } = model;
const { Department } = model;
const { product_category } = model;
const { Review } = model;

class Products {
  static async getProducts(req, res) {
    const product = await Product.findAndCountAll({
      attributes: { exclude: ["image", "image_2", "display"] }
    });
    res.send(product);
  }
  static async searchProduct(req, res) {
    const { query_string } = req.query;
    const product = await Product.findAndCountAll({
      where: { name: query_string },
      attributes: { exclude: ["image", "image_2", "display"] }
    });
    if (product.count == 0)
      return res.status(404).send({
        field: "ProductId",
        message: "The ProductId cannot be found",
        error: "404"
      });
    res.send(product);
  }

  static async getOneProduct(req, res) {
    const product = await Product.findByPk(req.params.product_id);
    if (!product)
      return res.status(404).send({
        field: "ProductId",
        message: "The ProductId cannot be found",
        error: "404"
      });
    res.send(product);
  }
  static async getCategoryProduct(req, res) {
    const id = req.params.category_id;
    const filteredCategory = await product_category.findAll({
      where: { category_id: id }
    });
    if (filteredCategory.length == 0)
      return res.status(404).send({
        field: "categoryId",
        message: "The categoryId cannot be found",
        error: "404"
      });
    const filteredProduct = await Product.findAndCountAll({
      where: { product_id: filteredCategory.map(a => a.product_id) },
      attributes: { exclude: ["image", "image_2", "display"] }
    });
    res.send(filteredProduct);
  }
  static async getDepartmentProduct(req, res) {
    const id = req.params.department_id;
    const filteredCategory = await Category.findAll({
      where: { department_id: id }
    });

    if (filteredCategory.length == 0)
      return res.status(404).send({
        field: "department",
        message: "The departmentcannot be found",
        error: "404"
      });
    const fc = await product_category.findAll({
      where: { category_id: filteredCategory.map(a => a.category_id) }
    });
    const filteredProduct = await Product.findAndCountAll({
      where: { product_id: fc.map(a => a.product_id) },
      attributes: { exclude: ["image", "image_2", "display"] }
    });
    res.send(filteredProduct);
  }

  static async getProductDetail(req, res) {
    const id = req.params.product_id;
    const product = await Product.findAll({ where: { product_id: id } });
    if (product.length == 0)
      return res.status(404).send({
        field: "product",
        message: "This product cannot be found",
        error: "404"
      });
    res.send(product);
  }

  static async getProductLocation(req, res) {
    const product_id = req.params.product_id;
    const checkProductId = await Product.findAll({
      where: {
        product_id: product_id
      }
    });
    if (checkProductId.length == 0)
      return res.status(404).send({
        field: "Product",
        message: "The ProductId cannot be found",
        error: "404"
      });
    const product_location = await sequelize.query(
      `SELECT c.category_id, c.name AS category_name, c.department_id,(SELECT name FROM   department WHERE  department_id = c.department_id) AS department_name FROM   category c WHERE  c.category_id IN (SELECT category_id FROM   product_category WHERE  product_id = ${product_id});`
    );
    res.send(product_location);
  }

  static async getProductReview(req, res) {
    const product_id = req.params.product_id;
    const product = await Product.findAll({
      where: { product_id: product_id }
    });
    if (product.length == 0)
      return res.status(404).send({
        field: "Product",
        message: "The ProductId cannot be found",
        error: "404"
      });
    const productReview = await sequelize.query(
      `SELECT c.name, r.review, r.rating, r.created_on FROM review r INNER JOIN customer c ON c.customer_id = r.customer_id WHERE r.product_id = ${product_id} ORDER BY r.created_on DESC;`
    );
    res.send(productReview);
  }
  static async postProductReview(req, res) {
    const id = req.params.product_id;
    const { review, rating } = req.body;

    // validate
    const schema = {
      review: Joi.string().required(),
      rating: Joi.number()
        .integer()
        .required()
    };

    const { error } = Joi.validate(req.body, schema);
    if (error) return res.status(400).send(error.details[0].message);

    //create
    const reviews = await Review.create({
      review,
      rating,
      product_id: id,
      customer_id: req.user.customer_id
    });
    res.send(reviews);
  }
}
export default Products;
