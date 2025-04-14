const review = require("../model/review");
module.exports.postRating = async (req, res) => {
  try {
    const newReview = new review({
      ...req.body,
      product: req.params.idprod
    });
    await newReview.save();
    res.send({ review: newReview });
  } catch (error) {
    res.send({ msg: error.message });
  }
};

module.exports.getprodreviews = async (req, res) => {
  try {
    const reviews = await review.find({ product: req.params.idprod });
    res.send({ reviews });
  } catch (error) {
    res.send({ msg: error.message });
  }
};
