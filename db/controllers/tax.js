import model from '../models';
const { Tax } = model;

class Taxes {
    static async getTax (req ,res){
        const taxes  = await Tax.findAll();
        res.send(taxes);
    }

    static async getTaxById(req ,res){
        const tax_id = req.params.tax_id;
        const tax = await Tax.findByPk(tax_id);
        if(!tax) return res.status(404).send("tax not found");
        res.send(tax);
    }

}
export default Taxes;