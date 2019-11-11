import Joi from "@hapi/joi";
import model from "../models";
const { Order, order_detail } = model;
class Orders {
  //strict check
  static async postOrder(req, res) {
    const { cart_id, shipping_id, tax_id } = req.body;

    const schema = {
      cart_id: Joi.string().required(),
      shipping_id: Joi.number()
        .integer()
        .required(),
      tax_id: Joi.number()
        .integer()
        .required()
    };

    const { error } = Joi.validate(req.body, schema);
    if (error) return res.status(400).send(error.details[0].message);

    //create

    const created_order = await Order.create({
      cart_id,
      shipping_id,
      tax_id,
      customer_id: req.user.customer_id
    });

    res.send({ orderId: created_order.order_id });
  }

  static async getOrder(req, res) {
    const id = req.params.order_id;
    const order = await order_detail.findAll({
      where: { order_id: id },
      attributes: { exclude: ["item_id"] }
    });
    if (!order) return res.status(404).send("order not found");
    res.send(order);
  }

  static async getCustomerOrder(req, res) {
    const order = await Order.findAll({
      where: { customer_id: req.user.customer_id },
      attributes: [
        "order_id",
        "total_amount",
        "created_on",
        "shipped_on",
        "status"
      ]
    });
    if (!order) return res.status(404).send("order not found");
    res.send(order);
  }

  static async getOrderDetail(req, res) {
    const order_id = req.params.order_id;
    const order = await Order.findByPk(order_id, {
      attributes: [
        "order_id",
        "total_amount",
        "created_on",
        "shipped_on",
        "status"
      ]
    });
    if (!order) return res.status(404).send("order not found");
    res.send(order);
  }
}
export default Orders;
