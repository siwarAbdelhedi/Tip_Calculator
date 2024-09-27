const Tip = require('../models/Tip');
const Staff = require('../models/Staff');


exports.createTip = async (req, res) => {
    try {
      const tips = req.body.tips;
      const createdTips = await Tip.insertMany(tips);
      res.status(201).json(createdTips);
    } catch (error) {
      console.error('Erreur lors de la création des pourboires:', error);
      res.status(500).json({ error: 'Erreur lors de la création des pourboires' });
    }
  };

exports.calculateTip = async (req, res) => {
    const { tips } = req.body;
  
    try {
      for (const { staffId, tip } of tips) {
        await Tip.create({
          staffId,
          amount: tip,
          serviceType: 'your_service_type_here',
        });
  
        await Staff.findByIdAndUpdate(staffId, {
          $inc: { totalTips: tip },
        });
      }
  
      res.status(200).json({ message: 'Tips calculated successfully' });
    } catch (error) {
      console.error('Error calculating tips:', error);
      res.status(500).json({ message: 'Error calculating tips', error });
    }
  };
  
  
