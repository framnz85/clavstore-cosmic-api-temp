const mongoose = require("mongoose");
const conn = require("../dbconnect/gratis");

const packageSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    images: Array,
    defaultPackage: {
      type: String,
      enum: ["basic", "dedicated"],
      default: "basic",
    },
    regularPrice: Number,
    promoPrice: Number,
    installmentPrice: Number,
    downPayment: Number,
    installTerm1: Number,
    installTerm3: Number,
    installTerm6: Number,
    installTerm12: Number,
    hostingFee: Number,
    setupCommission: Number,
    hostingCommission: Number,
    groupChatLink: String,
    default: Boolean,
    allowGuide: { type: Boolean, default: true },
    trainTitle: String,
    allowTraining: Boolean,
    training: [
      {
        title: String,
        lessons: Array,
      },
    ],
  },
  { timestamps: true }
);

packageSchema.index({ name: "text" });

const Package = conn.model("GratisPackage", packageSchema);

module.exports = Package;
