const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
	// find all tags
	// be sure to include its associated Product data
	try {
		const tagData = await Tag.findAll({
			include: [{ model: Product }],
		});
		if (!tagData) {
			res.status(404).json({ message: "No products found!" });
			return;
		}
		res.status(200).json(tagData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/:id", async (req, res) => {
	// find a single tag by its `id`
	// be sure to include its associated Product data
	try {
		const tagId = await Tag.findByPk(req.params.id, {
			include: [{ model: Product }],
		});
		if (!tagId) {
			res.status(404).json({ message: "No tag found!" });
			return;
		}
		res.status(200).json(tagId);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post("/", async (req, res) => {
	// create a new tag
	try {
		const tagCreate = await Tag.create(req.body);
		if (!tagCreate) {
			res.status(404)({ message: "unable to create tag!" });
			return;
		}
		res.status(200).json(tagCreate);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put("/:id", async (req, res) => {
	// update a tag's name by its `id` value
	try {
		const tagUpdate = await Tag.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		if (!tagUpdate) {
			res.status(404).json({ message: "unable to find tag to update!" });
			return;
		}
		res.status(200).json(tagUpdate);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete("/:id", async (req, res) => {
	// delete on tag by its `id` value
	try {
		const deleteTag = await Tag.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (!deleteTag) {
			res.status(404).json({ message: "No tag by that name found!" });
			return;
		}
		res.status(200).json(deleteTag);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
