import { VideoObjectSchemaType, VideoObjectSchema } from "@/src/schemas/videoObject"
import fs from 'fs'

class VideoService {
    validateSchema(videoObject: VideoObjectSchemaType) {
        const parse = VideoObjectSchema.safeParse(videoObject)
        if (!parse) return false
        if (!parse.success) {
            console.error(`Invalid video object:\n`, parse.error)
            fs.writeFileSync('structuredDataError.log', `\n\nInvalid Video Object\n${JSON.stringify(parse.error)}`)
            return false
        }
        return true
    }
}

export default VideoService
