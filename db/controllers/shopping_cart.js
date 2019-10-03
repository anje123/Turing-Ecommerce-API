import model, { sequelize } from '../models';
import Joi from '@hapi/joi';
const { shopping_cart ,Product} = model;

class Shopping_Cart {
    static async generateUniqueId(req ,res){
        const uniqueId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(6, 15);
        res.send({cart_id: uniqueId});
    }

    static async addProductToCart(req ,res){
        const { cart_id,product_id,attributes } = req.body;

        // validate
        const schema = {
            cart_id: Joi.number().integer().required(),
            product_id: Joi.number().integer().required(),
            attributes: Joi.string().required()
          }
    
          
          const {error} = Joi.validate(req.body,schema)
          if(error) return res.status(400).send(error.details[0].message);


        //create
        const create_cart_Product = await shopping_cart.create({ cart_id,product_id,attributes });
        const cartProduct = await shopping_cart.findAll({where: {cart_id: create_cart_Product.cart_id},attributes: ["item_id","product_id","attributes","quantity"]});
        const products = await Product.findAll({where: {product_id: cartProduct.map(a => (a.product_id))} ,attributes: ["product_id","name","image","price"]});

        let items =[]
      
         for (let i =0; i< products.length; i++){

            let product_data_values = products[i].dataValues;
            const get_product_item_id = await shopping_cart.findOne({where:{product_id:product_data_values.product_id ,cart_id: create_cart_Product.cart_id}});
                product_data_values.item_id = get_product_item_id.dataValues.item_id;
                product_data_values.quantity = get_product_item_id.dataValues.quantity;
                product_data_values.attributes = get_product_item_id.dataValues.attributes;
                product_data_values.subtotal =  String(product_data_values.price * get_product_item_id.quantity); 
                items[i] = product_data_values
            }
         res.send(items);
    }

    static async getProductCartList(req ,res){
        const id = req.params.cart_id;

        const find_cart = await shopping_cart.findAll({where: {cart_id:id}});
        if(!find_cart) return res.status(404).send("cart not found");
        const products = await Product.findAll({where: {product_id: find_cart.map(a => (a.product_id))} ,attributes: ["product_id","name","image","price"]});
        
        let items =[]
      
        for (let i =0; i< products.length; i++){

           let product_data_values = products[i].dataValues;
           const get_product_item_id = await shopping_cart.findOne({where:{product_id:product_data_values.product_id ,cart_id: id}});
               product_data_values.item_id = get_product_item_id.dataValues.item_id;
               product_data_values.quantity = get_product_item_id.dataValues.quantity;
               product_data_values.attributes = get_product_item_id.dataValues.attributes;
               product_data_values.subtotal =  String(product_data_values.price * get_product_item_id.quantity); 
               items[i] = product_data_values
           }
        res.send(items);

    }

    static async updateProductCartList(req ,res){
        const item_id = req.params.item_id;
        const quantity = req.body.quantity;


        // validate
        const schema = {
            quantity: Joi.number().integer().required()
          }
    
          
        const {error} = Joi.validate(req.body,schema)
        if(error) return res.status(400).send(error.details[0].message);


        const find_item = await shopping_cart.findOne({where : {item_id: item_id}});
        if(!find_item) return res.status(404).send("cart not found");
        const updated_item = await find_item.update({quantity});
        const product = await Product.findOne({where: {product_id: updated_item.product_id} ,attributes: ["product_id","name","image","price"]});
        const  product_data_value = product.dataValues;
        product_data_value.item_id = updated_item.item_id;
        product_data_value.quantity = updated_item.quantity;
        product_data_value.attributes = updated_item.attributes;
        product_data_value.subtotal =  String(product_data_value.price * product_data_value.quantity); 

        res.send(product.dataValues);
        

        

        
    }

    static async emptyCart(req ,res){
        const cart_id = req.params.cart_id;
        const deleted_cart = await shopping_cart.destroy({where: {cart_id}});
        if(!deleted_cart) return res.status(404).send("cart_id not found");
        res.send([]);
    }

    static async moveToCart(req ,res){
        const item_id = req.params.item_id;
        const find_item = await shopping_cart.findOne({where: {item_id: item_id}});
        if(!find_item) return res.status(404).send("item not found");
         await find_item.update({
             buy_now: true,
             added_on: Date.now() 
         }); 
        res.end(); 
    }

    static async cartTotalAmount(req ,res){
        const cart_id = req.params.cart_id;
        const find_cart = await shopping_cart.findAll({where: {cart_id}});
        if(find_cart.length == 0) return res.status(404).send("cart not found");
         
        const products = await Product.findAll({where: {product_id: find_cart.map(a => a.product_id)}});

        Array.prototype.sum = function (price) {
            let total_amount = 0
            for ( let i = 0, _len = products.length; i < _len; i++ ) {
                total_amount += products[i][price] * find_cart[i].quantity;
            }
            return total_amount.toFixed(2)
        }

        res.send({total_amount: products.sum("price")});
      
    }

    static async saveForLater(req ,res){
        const item_id = req.params.item_id;
        const find_item = await shopping_cart.findOne({where: {item_id}});
        if(!find_item) return res.status(404).send("item not found");
         await find_item.update({
             buy_now: false,
             quantity: 1
         }); 
        res.end(); 
    }

    static async getSavedLaterProduct(req ,res){
     const item_id = req.params.cart_id;
     const product = await sequelize.query(`SELECT sc.item_id, p.name, sc.attributes, COALESCE(NULLIF(p.discounted_price, 0),p.price) AS price FROM shopping_cart sc INNER JOIN product p ON sc.product_id = p.product_id WHERE sc.cart_id = ${item_id} AND NOT sc.buy_now;`);
     res.send(product);


    }
    
    static async removeProduct(req ,res){
        const item_id = req.params.item_id;
        const deleted_cart = await shopping_cart.destroy({where: {item_id}});
        if(!deleted_cart) return res.status(404).send("item_id not found");
        res.end();
    }



}
export default Shopping_Cart;