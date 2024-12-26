const express = require("express");
const router = express.Router();
const {
  getEstore,
  getEstoreById,
  getDefaultEstore,
  getReseller,
  getPackage,
  getPackages,
  getDedicatedEstores,
  getEstoreCounters,
  updateEstore,
  createEstore,
  addNewEstore,
  copyingEstore,
  updateEstoreCounters,
  updateEstoresDefault,
  deletingEstore,
} = require("../controllers/estore");
const { authCheck, adminGratisCheck } = require("../middlewares/auth");

router.get("/gratis/estore/:slug", getEstore);
router.get("/gratis/estore-by-id/:estoreid", getEstoreById);
router.get("/gratis/default-estore", getDefaultEstore);
router.get("/gratis/reseller/:id", getReseller);
router.get("/gratis/get-package/:id/:packDefault", getPackage);
router.get("/gratis/get-packages/:packDefault", getPackages);
router.get("/gratis/dedicated-estores", getDedicatedEstores);
router.get("/gratis/estore-counters/:estoreid", getEstoreCounters);
router.post("/gratis/estore-update", authCheck, adminGratisCheck, updateEstore);
router.post("/gratis/estore-create/:resellid", createEstore);
router.post(
  "/gratis/add-new-estore/:resellid",
  authCheck,
  adminGratisCheck,
  addNewEstore
);
router.post(
  "/gratis/copying-estore/:resellid",
  authCheck,
  adminGratisCheck,
  copyingEstore
);
router.put("/gratis/update-estore-counters", updateEstoreCounters);
router.put("/gratis/update-estores-default", updateEstoresDefault);
router.delete(
  "/gratis/delete-estore/:deleteid",
  authCheck,
  adminGratisCheck,
  deletingEstore
);

module.exports = router;
