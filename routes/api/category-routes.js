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

router.get("/:id", async (req, res) => {
	// find one category by its `id` value
	// be sure to include its associated Products
	try {
		const categoryId = await Category.findByPk(req.params.id, {
			include: [{ model: Product }],
		});
		if (!categoryId) {
			res.status(404).json({ message: "No category by that name found!" });
			return;
		}
		res.status(200).json(categoryId);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post("/", async (req, res) => {
	// create a new category
	try {
		const categoryCreate = await Category.create(req.body);
		if (!categoryCreate) {
			res.status(404).json({ message: "unable to create category!" });
			return;
		}
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
		if (!categoryUpdate) {
			res.status(404).json({ message: "unable to find category to update!" });
			return;
		}
		res.status(200).json(categoryUpdate);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete("/:id", async (req, res) => {
	// delete a category by its `id` value
	try {
		const deleteCategory = await Category.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (!deleteCategory) {
			res.status(404).json({ message: "No category by that name found!" });
			return;
		}
		res.status(200).json(deleteCategory);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
