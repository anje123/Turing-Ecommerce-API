import model from '../models';
const {shipping_region, shipping} = model;

class Shipping_Region {
    static async getShippingRegions(req ,res){
        const shipping_regions = await shipping_region.findAll();
        res.send(shipping_regions);
    }

    static async getShippingRegionById(req ,res){
        const shipping_region_id = req.params.shipping_region_id;
        const find_shippings = await shipping.findAll({where: {shipping_region_id}});
        if(find_shippings.length == 0) return res.status(404).send("shipping not found");
        res.send(find_shippings);
    }
}

export default Shipping_Region;