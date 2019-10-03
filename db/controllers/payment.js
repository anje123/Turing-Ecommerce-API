// eslint-disable-next-line no-undef
const stripe = require('stripe')('sk_test_jtuTLaIZRwcRMgbsoyvEDzH800HgE212qB');
import Joi from '@hapi/joi';
import model from '../models'
const { audit } = model;


class Payment {
    static async createCharge(req ,res){
        const {order_id,description,amount,currency} = req.body;

    
        try {
            const token = req.body.stripeToken; 

        const charge = await stripe.charges.create({
            amount,
            currency : currency || "USD",
            description,
            source: token,
        });
        
        if(!charge) return res.status(404).send("charge not found");

        res.send(charge);
        } catch (error) {
            res.send(error.raw.message);
        }

            }

}
export default Payment;