import model, { sequelize } from "../models";
const { Attribute } = model;
const { Attribute_Value } = model;
const { product_attribute } = model;

class Attributes {
  static async getAttributes(req, res) {
    const attributes = await Attribute.findAll();
    res.send(attributes);
  }

  static async getOneAttributes(req, res) {
    const attribute = await Attribute.findByPk(req.params.attribute_id);
    if (!attribute)
      return res.status(404).send({
        field: "attribute_id",
        message: "The attribute_id cannot be found",
        error: "404"
      });
    res.send(attribute);
  }

  static async getValuesAttributes(req, res) {
    const attribute_value = await Attribute_Value.findAll({
      attributes: { exclude: ["attribute_id"] },
      where: { attribute_id: req.params.attribute_id }
    });
    if (attribute_value.length == 0)
      return res.status(404).send({
        field: "attribute_id",
        message: "The attribute_id cannot be found",
        error: "404"
      });
    res.send(attribute_value);
  }

  static async getProductAttributes(req, res) {
    const product_id = req.params.product_id;
    const checkProductAttribureId = await product_attribute.findAll({
      where: {
        product_id: product_id
      }
    });
    if (checkProductAttribureId.length == 0)
      return res.status(404).send({
        field: "ProductId",
        message: "The ProductId cannot be found",
        error: "404"
      });
    const attribute = await sequelize.query(
      `SELECT  a.name AS attribute_name, av.attribute_value_id, av.value AS attribute_value FROM attribute_value av INNER JOIN attribute a ON av.attribute_id = a.attribute_id WHERE av.attribute_value_id IN (SELECT attribute_value_id FROM   product_attribute WHERE  product_id = ${product_id}) ORDER BY   a.name;`
    );

    res.send(attribute);
  }
}
export default Attributes;
