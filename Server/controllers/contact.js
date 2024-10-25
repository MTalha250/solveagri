import Contact from "../models/contact.js";

export const createContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json(newContact);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteContact = async (req, res) => {
    const { id } = req.params;
    try {
        await Contact.findByIdAndRemove(id);
        res.status(200).json({ message: "Contact deleted successfully." });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};