
const express = require("express");
const router = express.Router();

const userController = require("../Controller/userController");
const { authUser } = require("../Middleware/authMiddleware");
const { authorize } = require("../Middleware/roleMiddleware");

// Public routes
router.post("/create", userController.createUser);
router.post("/login", userController.loginUser);

// Protected dashboard routes
router.get(
    "/adminDashboard",
    authUser,
    authorize("admin"),
    userController.adminDashboard
);

router.get(
    "/managerDashboard",
    authUser,
    authorize("manager"),
    userController.managerDashboard
);

router.get(
    "/userDashboard",
    authUser,
    authorize("user"),
    userController.userDashboard
);

// Protected user CRUD routes
router.get("/", authUser, authorize("admin"), userController.getAllUsers);

router.get("/:id", authUser, userController.getUserById);

router.put("/:id", authUser, userController.updateUser);

router.delete(
    "/:id",
    authUser,
    authorize("admin"),
    userController.deleteUser
);

module.exports = router;
