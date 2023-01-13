const router = require("express").Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
