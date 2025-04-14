 const productmodel = require("../model/product");
const filterproduct = async (req, res, next) => {
  try {
    const { priceq, cat } = req.query;

    let products = [];
    if (priceq) {
      products = await productmodel.find({ price: { $gte: priceq } });
     return res.send({products})
    } else if (cat) {
      products = await productmodel.find({ category: cat });
      return res.send({products})
    }
    next()
  } catch (error) {
    res.send({ msg: error.message });
  }
};
module.exports = filterproduct