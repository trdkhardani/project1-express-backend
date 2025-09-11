import fs from 'fs'
import path from 'path'
import { __filename, __dirname } from "../app.ts"

export class FsUtils {
    static deleteFile(filePath: string) {
        return fs.unlink(path.join(__dirname, filePath), (err) => {
            if(err) {
                console.error(err)
            }
        })
    }
}