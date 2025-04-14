const productmodel = require("../model/product");

// ✅ Ajouter un produit

module.exports.addProduct = async (req, res) => {
  try {
    const { name, price, description, qtes, category, size, color } = req.body;

    console.log("Fichier reçu:", req.file); // Debugging
    console.log("Données reçues:", req.body);

    // Validation des champs requis
    if (!name || !price || !qtes || !category) {
      return res.status(400).json({
        msg: "Les champs name, price, qtes et category sont obligatoires"
      });
    }

    // Gestion de l'image
    let imgUrl = "default-image.jpg"; // Image par défaut
    if (req.file) {
      const url = `${req.protocol}://${req.get("host")}/uploads/products/`;
      imgUrl = `${url}${req.file.filename}`;
    }

    // Vérification de l'existence du produit
    const existeprod = await productmodel.findOne({ name });
    if (existeprod) {
      return res.status(400).json({ msg: "Le produit existe déjà" });
    }

    // Création du produit
    const newproduct = new productmodel({
      name,
      price: Number(price),
      description: description || "",
      qtes: Number(qtes),
      category,
      size: size ? size.split(",") : [], // Si size est une string séparée par des virgules
      color: color ? color.split(",") : [], // Si color est une string séparée par des virgules
      img: imgUrl,
      user: req.user._id, // Nécessite un middleware d'authentification
      disponible: true
    });

    await newproduct.save();
    res.status(201).json({
      success: true,
      product: newproduct
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit:", error);
    res.status(500).json({
      success: false,
      msg: "Erreur serveur",
      error: error.message
    });
  }
};

// ✅ Récupérer tous les produits
module.exports.getallproducts = async (req, res) => {
  try {
    const products = await productmodel.find({});
    res.json({ products });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Récupérer un produit par ID
module.exports.getoneprod = async (req, res) => {
  try {
    const { idprod } = req.params;
    const prod = await productmodel.findById(idprod);

    if (!prod) {
      return res.status(404).json({ msg: "Produit non trouvé" });
    }

    res.json({ product: prod });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Mettre à jour un produit
module.exports.updateprod = async (req, res) => {
  try {
    const { idprod } = req.params;

    // Vérifie si un fichier est uploadé
    let imgUrl = req.body.img; // Conserve l'ancienne image si pas de nouveau fichier
    if (req.file) {
      const url = `${req.protocol}://${req.get("host")}/uploads/products/`;
      imgUrl = `${url}${req.file.filename}`;
    }

    const updatedProd = await productmodel.findByIdAndUpdate(
      idprod,
      { $set: { ...req.body, img: imgUrl } },
      { new: true }
    );

    if (!updatedProd) {
      return res.status(404).json({ msg: "Produit non trouvé" });
    }

    res.json({ product: updatedProd });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Supprimer un produit
module.exports.deleteprod = async (req, res) => {
  try {
    const { idprod } = req.params;
    const deletedProd = await productmodel.findByIdAndDelete(idprod);

    if (!deletedProd) {
      return res.status(404).json({ msg: "Produit non trouvé" });
    }

    res.json({ msg: "Produit supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
