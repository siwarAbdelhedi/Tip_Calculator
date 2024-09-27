const Staff = require('../models/Staff');

exports.distributeTips = async (staffIds, totalAmount) => {
    try {
        const staffMembers = await Staff.find({ _id: { $in: staffIds } });

        if (!staffMembers.length) {
            throw new Error("Aucun employé trouvé.");
        }

        const individualTip = totalAmount / staffMembers.length;

        const updatedStaffPromises = staffMembers.map(async (staff) => {
            staff.tips = (staff.tips || 0) + individualTip;
            await staff.save();
            return staff;
        });

        const updatedStaff = await Promise.all(updatedStaffPromises);

        return updatedStaff;
    } catch (error) {
        console.error("Erreur lors de la répartition des pourboires:", error);
        throw error;
    }
};
