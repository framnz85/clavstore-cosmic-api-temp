const ObjectId = require("mongoose").Types.ObjectId;

const Billing = require("../models/billing");

const findLatestBill = async (estoreid, packid) => {
  return await Billing.findOne({
    estoreid: new ObjectId(estoreid),
    package: new ObjectId(packid),
    status: "Unpaid",
  }).sort({ deadline: 1 });
};

exports.latestBill = async (req, res) => {
  const estoreid = req.headers.estoreid;
  const packid = req.params.packid;

  try {
    const latest = await findLatestBill(estoreid, packid);
    if (latest) {
      res.json(latest);
    } else {
      res.json({ ok: true });
    }
  } catch (error) {
    res.json({ err: "Getting latest bill fails. " + error.message });
  }
};

exports.getBillings = async (req, res) => {
  const estoreid = req.headers.estoreid;
  const packid = req.params.packid;

  try {
    const billings = await Billing.find({
      estoreid: new ObjectId(estoreid),
      package: new ObjectId(packid),
    })
      .populate("package")
      .populate("bank")
      .sort({ deadline: 1 });
    res.json(billings);
  } catch (error) {
    res.json({ err: "Getting billings fails. " + error.message });
  }
};

exports.addBilling = async (req, res) => {
  const values = req.body;
  let data = {};
  let billing = {};

  try {
    for (let i = 0; i < values.length; i++) {
      data = {
        ...values[i],
        estoreid: new ObjectId(values[i].estoreid),
        package: new ObjectId(values[i].package),
      };
      billing = new Billing(data);
      await billing.save();
    }
    res.json({ ok: true });
  } catch (error) {
    res.json({ err: "Adding billing fails. " + error.message });
  }
};

exports.updateBilling = async (req, res) => {
  const estoreid = req.headers.estoreid;
  const billid = req.body.billid;
  let data = req.body;

  try {
    delete data.billid;
    if (data && data.bank) {
      data = { ...data, bank: new ObjectId(data.bank) };
    }
    const result = await Billing.findOneAndUpdate(
      {
        _id: new ObjectId(billid),
        estoreid: new ObjectId(estoreid),
      },
      data,
      { new: true }
    );
    res.json(result);
  } catch (error) {
    res.json({ err: "Getting billings fails. " + error.message });
  }
};
