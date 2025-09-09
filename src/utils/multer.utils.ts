import multer from "multer";

const storage = (fileDestination: string) => {
    return multer.diskStorage({
        destination(req, file, callback) {
            callback(null, fileDestination)
        },
        filename(req, file, callback) {
            callback(null, file.originalname)
        }
    })
}

export const upload = (fileDestination: string) => {
    const allowedMimeTypes = ["image/jpeg", "image/png"]
    return multer({storage: storage(fileDestination), limits: {
        fileSize: 1024 * 1024 * 5 // 5 MB max
    }, fileFilter(req, file, callback) {
        if(allowedMimeTypes.includes(file.mimetype)) {
            callback(null, true)
        } else {
            callback(new Error("Invalid file type. Accepted file type: JPG and PNG"))
        }
    }})
} 