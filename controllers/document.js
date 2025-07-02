const Document = require("../models/document")
const { validateDocument} = require("../utils/validateInput");

const create = async(req,res) => {

    const {error} = validateDocument(req.body)
    if(error) return res.status(400).json({message: error.details[0].message})


    const doc = new Document({
        title: req.body.title,
        content: req.body.content,
        ownerId: req.user._id
    })

    await doc.save()
    res.status(201).json(doc)
}

const allDocs = async (req,res) => {
    const filterRole = req.user.role === 'Admin' ? {} : {ownerId: req.user._id}
    const docs = await Document.find(filterRole)
    res.json(docs)
}

const singleDoc = async(req,res) => {
    const id = req.params.id
    const doc = await Document.findById(id)

    if(!doc) return res.status(404).json({message: "Document not found"})

    if(doc.ownerId.toString() !== req.user._id.toString() && req.user.role !== 'Admin')
        return res.status(403).json({message: "Access Denied"})

    res.json(doc)
}

const update = async (req,res) => {
    const id = req.params.id
    const doc = await Document.findById(id)

    if(!doc) return res.status(404).json({message: "Document not found"})

    if(doc.ownerId.toString() !== req.user._id.toString() && req.user.role !== 'Admin')
        return res.status(403).json({message: "Access Denied"})

    doc.title = req.body.title
    doc.content = req.body.content

    await doc.save()
    res.status(200).json(doc)
}

const remove = async (req,res) => {
    const id = req.params.id
    const doc = await Document.findById(id)

    if(!doc) return res.status(404).json({message: "Document not found"})

    res.status(200).json(doc)
}

module.exports = {create,allDocs, singleDoc, update, remove}
