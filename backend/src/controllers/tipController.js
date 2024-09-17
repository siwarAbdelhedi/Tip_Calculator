const Tip = require('../models/Tip');
const calculationService = require('../services/calculationService');

exports.createTip = async (req, res) => {
  try {
    const tip = new Tip(req.body);
    await tip.save();
    res.status(201).json(tip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllTips = async (req, res) => {
  try {
    const tips = await Tip.find().populate('service').populate('staff');
    res.json(tips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTipById = async (req, res) => {
  try {
    const tip = await Tip.findById(req.params.id).populate('service').populate('staff');
    if (!tip) return res.status(404).json({ message: 'Tip not found' });
    res.json(tip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTip = async (req, res) => {
  try {
    const tip = await Tip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tip) return res.status(404).json({ message: 'Tip not found' });
    res.json(tip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTip = async (req, res) => {
  try {
    const tip = await Tip.findByIdAndDelete(req.params.id);
    if (!tip) return res.status(404).json({ message: 'Tip not found' });
    res.json({ message: 'Tip deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTipsByPeriod = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const result = await calculationService.calculateTipsByPeriod(new Date(startDate), new Date(endDate));
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};