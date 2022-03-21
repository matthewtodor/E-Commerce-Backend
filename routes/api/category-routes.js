const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
	// find all categories
	// be sure to include its associated Products
	try {
		const categoriesData = await Category.findAll({
			include: [{ model: Product }],
		});
		if (!categoriesData) {
			res.status(404).json({ message: "No category found!" });
			return;
		}
		res.status(200).json(categoriesData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/:id", (req, res) => {
	// find one category by its `id` value
	// be sure to include its associated Products
});

router.post("/", async (req, res) => {
	// create a new category
	try {
		const categoryCreate = await Category.create(req.body);
		res.status(200).json(categoryCreate);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put("/:id", async (req, res) => {
	// update a category by its `id` value
	try {
		const categoryUpdate = await Category.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json(categoryUpdate);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete("/:id", (req, res) => {
	// delete a category by its `id` value
});

module.exports = router;
