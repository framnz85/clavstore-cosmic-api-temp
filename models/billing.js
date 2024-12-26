const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const conn = require("../dbconnect/gratis");
const Package = require("./package");
const Payment = require("./payment");

const billingSchema = new mongoose.Schema(
  {
    estoreid: ObjectId,
    package: {
      type: ObjectId,
      ref: Package,
    },
    packageDesc: String,
    totalAmount: Number,
    bank: {
      type: ObjectId,
      ref: Payment,
    },
    status: {
      type: String,
      enum: ["Unpaid", "Pending", "Paid"],
      default: "Unpaid",
    },
    payDeadline: Date,
    billStatus: {
      type: String,
      enum: ["Not Billed", "Pending", "Billed"],
      default: "Not Billed",
    },
    billDeadline: Date,
    referenceNum: String,
    datePaid: Date,
  },
  { timestamps: true }
);

billingSchema.index({ name: "text" });

const Billing = conn.model("GratisBilling", billingSchema);

module.exports = Billing;
