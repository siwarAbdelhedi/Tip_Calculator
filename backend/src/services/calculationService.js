const Tip = require('../models/Tip');

exports.calculateTipsByPeriod = async (startDate, endDate) => {
  const tips = await Tip.find({
    date: {
      $gte: startDate,
      $lte: endDate
    }
  }).populate('service').populate('staff');

  const totalAmount = tips.reduce((sum, tip) => sum + tip.amount, 0);

  const tipsByService = tips.reduce((acc, tip) => {
    if (!acc[tip.service.name]) {
      acc[tip.service.name] = 0;
    }
    acc[tip.service.name] += tip.amount;
    return acc;
  }, {});

  const tipsByStaff = tips.reduce((acc, tip) => {
    if (!acc[tip.staff.name]) {
      acc[tip.staff.name] = 0;
    }
    acc[tip.staff.name] += tip.amount;
    return acc;
  }, {});

  return {
    totalAmount,
    tipsByService,
    tipsByStaff
  };
};