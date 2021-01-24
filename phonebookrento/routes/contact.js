const experss = require("express");
const router = experss.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Contact = mongoose.model("Contact");
const requireLogin = require('../middleware/requireLogin')

router.get('/allcontacts', requireLogin, (req, res) => {
    Contact.find()
        .then(contacts => {
            res.json({ contacts })
        })
        .catch(err => {
            res.json({ err })
        })
})

router.post('/addcontact', requireLogin, (req, res) => {
    const { name, email, phone } = req.body.contact;
    if (!name || !email) {
        return res.status(422).json({ err: "Please enter email and name both" })
    }
    Contact.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.json({ err: "Email Already exist" });
            }
            const contact = new Contact({
                name,
                email,
                phone,
                postedBy:req.user._id
            })
            contact.save()
                .then(result => {
                    res.json({ msg: "Added" })
                })
                .catch(err => {
                    res.json({ err })
                })
        })
})

router.delete('/deletecontact/:contactId', (req, res) => {
    Contact.findOne({ _id: req.params.contactId })
        .exec((err, contact) => {
            if (err || !contact) {
                console.log(err)
                return res.status(422).json({ err })
            }
            contact.remove()
                .then(result => {
                    console.log('ss')
                    res.json(result)
                }).catch(err => {
                    res.json({ err })
                })
        })
})
router.put('/updatecontact/:conId', requireLogin, (req, res) => {
    Contact.findOne({ _id: req.params.conId })
        .exec((err, contact) => {
            if (err || !contact) {
                console.log(err)
                return res.status(422).json({ err })
            }
            contact.remove()
                .then(result => {
                    const { name, email, phone } = req.body.contact;
                    if (!name || !email) {
                        return res.status(422).json({ err: "Please enter email and name both" })
                    }
                    Contact.findOne({ email: email })
                        .then((savedUser) => {
                            if (savedUser) {
                                return res.json({ err: "Email Already exist" });
                            }
                            const contact = new Contact({
                                name,
                                email,
                                phone,
                                postedBy:req.user._id
                            })
                            contact.save()
                                .then(result => {
                                    res.json({ msg: "Added" })
                                })
                                .catch(err => {
                                    res.json({ err })
                                })
                        })
                }).catch(err => {
                    res.json({ err })
                })
        })
})
module.exports = router