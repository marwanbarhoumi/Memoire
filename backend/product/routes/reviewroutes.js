const express = require("express");
const { postRating, getprodreviews } = require("../controllers/reviewcontrollers");
const router = express.Router();

/**
 * @route POST /review/add/:idprod
 * @descripton add new review
 * @acess public
 */
router.post("/add/:idprod", postRating);

/**
 * @route GET /review/:idprod
 * @descripton get  product reviews
 * @acess public
 */
router.get("/:idprod", getprodreviews);

module.exports = router;
