import Newsletter from "../models/newsletter.js";

export const createNewsletter = async (req, res) => {
    const {firstName, lastName, email} = req.body;
    try {
        // Check if email already exists
        const oldNewsletter = await Newsletter.findOne({email});
        if (oldNewsletter) {
            res.status(409).json({success:false, message: "Email already exists"});
            return; 
        }
        const newsletter = new Newsletter({firstName, lastName, email});
        await newsletter.save();
        res.status(201).json({success:true, newsletter});
    } catch (error) {
        res.status(409).json({success:false, message: error.message });
    }
};

export const getNewsletters = async (req, res) => {
    try {
        const newsletters = await Newsletter.find();
        res.status(200).json({success:true, newsletters});
    } catch (error) {
        res.status(404).json({success:false, message: error.message });
    }
};

export const deleteNewsletterbyEmail = async (req, res) => {
    try {
        const {email} = req.body;
        await Newsletter.findOneAndDelete({email});
        res.status(200).json({success:true, message: "Newsletter deleted successfully"}); 
    } catch (error) {
        res.status(404).json({success:false, message: error.message });
    }
};

export const deleteNewsletterbyId = async (req, res) => {
    try {
        const {id} = req.params;
        await Newsletter.findByIdAndDelete(id);
        res.status(200).json({success:true, message: "Newsletter deleted successfully"}); 
    } catch (error) {
        res.status(404).json({success:false, message: error.message });
    }
};

// Get total number of subscribers

export const getSubscribers = async (req, res) => {
    try {
        const subscribers = await Newsletter.find();
        res.status(200).json({success:true, count:subscribers.length});
    } catch (error) {
        res.status(404).json({success:false, message: error.message });
    }
}