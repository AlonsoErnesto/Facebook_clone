const express = require("express");
const {
  register,
  activateAccount,
  login,
  auth,
  sendVerification,
  findUser,
  sendResetPasswordCode,
  validateResetCode,
  changePassword,
  getProfile,
  updateProfilePicture,
  updateCover,
  updateDetails,
  addFriend,
  cancelRequest,
  follow,
  unfollow,
  acceptRequest,
  unfriend,
  deleteRequest
} = require("../controllers/user");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/activate",authUser, activateAccount);
router.post("/login", login);

router.post("/sendVerification",authUser,sendVerification);
router.post("/findUser", findUser);
router.post("/sendResetPasswordCode", sendResetPasswordCode);
router.post("/validateResetCode", validateResetCode);
router.post("/changePassword", changePassword);

router.get("/getProfile/:username",authUser, getProfile);
router.put("/updateProfilePicture",authUser, updateProfilePicture);
router.put("/updateCover",authUser, updateCover);
router.put("/updateDetails",authUser, updateDetails);

router.post("/addFriend/:id",authUser, addFriend);
router.post("/cancelRequest/:id",authUser, cancelRequest);
router.post("/follow/:id",authUser, follow);
router.post("/unfollow/:id",authUser, unfollow);
router.post("/acceptRequest/:id",authUser, acceptRequest);
router.post("/unfriend/:id",authUser, unfriend);
router.post("/deleteRequest/:id",authUser, deleteRequest);

module.exports = router;
