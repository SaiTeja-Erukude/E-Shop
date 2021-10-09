import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router()

const uploadPath = path.join(path.resolve(), '/frontend/public/images/')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadPath)
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        )
    },
})

function checkFileType(file, cb) {
    const fileTypes = /jpg|jpeg|png/
    const extName = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
    )
    const mimeType = fileTypes.test(file.mimetype)

    if (extName && mimeType) {
        return cb(null, true)
    } else {
        return cb('Images only!')
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },
})

router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default router
