import model, { sequelize } from '../models';
const {Attribute} = model;
const {Attribute_Value} = model;


class Attributes {
    static async getAttributes(req ,res){
        const attributes = await Attribute.findAll();
        if(!attributes) return res.status(404).send({field: "attribute", message: "The attributes cannot be found",error: "404"});
        res.send(attributes);
    }

    static async getOneAttributes(req ,res){
        const attribute = await Attribute.findByPk(req.params.attribute_id);
        if(!attribute) return res.status(404).send({field: "attribute_id", message: "The attribute_id cannot be found",error: "404"});
        res.send(attribute);
    }

    static async getValuesAttributes(req ,res){
        const attribute_value = await Attribute_Value.findAll({ attributes:{exclude: ["attribute_id"]},  where: {attribute_id: req.params.attribute_id}});
        if(!attribute_value) return res.status(404).send({field: "attribute_id", message: "The attribute_id cannot be found",error: "404"});
        res.send(attribute_value);
    } 

    static async getProductAttributes(req ,res){ 
        const id = req.params.product_id;
        const attribute = await sequelize.query(`SELECT a.name AS attribute_name, av.attribute_value_id, av.value AS attribute_value FROM attribute_value av INNER JOIN attribute a ON av.attribute_id = a.attribute_id WHERE av.attribute_value_id IN (SELECT attribute_value_id FROM   product_attribute WHERE  product_id = ${id}) ORDER BY   a.name;`);
        if(!attribute)  return res.status(404).send({field: "ProductId", message: "The ProductId cannot be found",error: "404"});
        res.send(attribute);
    }
}
export default Attributes;