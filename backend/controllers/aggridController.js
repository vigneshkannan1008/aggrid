

const users = require('../models/aggridModel');

const getUsers = async (req, res) => {
    try {
        if (req.body && (req.body.startRow !== undefined || req.body.endRow !== undefined)) {
            return getServerSideUsers(req, res);
        }

        const user = await users.find();
        res.json({ success: true, user });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

const getServerSideUsers = async (req, res) => {
    try {
        const { startRow, endRow } = req.body;

        const pageSize = endRow - startRow;
        const skip = startRow;

        const data = await users.find().skip(skip).limit(pageSize);

        const totalCount = await users.countDocuments();

        res.json({
            rowData: data,
            rowCount: totalCount,
        })
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
}

const createUser = async (req, res) => {
    try {
        const newUser = new users(req.body);
        await newUser.save();
        res.status(201).json({ success: true, user: newUser });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const updated = await users.findOneAndUpdate({ regNo: req.params.regNo }, req.body, {
            new: true,
        });
        if (!updated) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, user: updated });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deleted = await users.findOneAndDelete({ regNo: req.params.regNo });
        if (!deleted) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, message: "User deleted successfully" });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};