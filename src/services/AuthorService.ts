import { AuthorSchemaType, AuthorSchema } from '@/src/schemas/author'
import fs from 'fs'

class AuthorService {
    validateAuthor(author: AuthorSchemaType) {
        const parse = AuthorSchema.safeParse(author)
        if (!parse.success) {
            // console.log(`Invalid author:\n`, parse.error)
            // fs.writeFileSync('structuredDataError.log', `\n\nInvalid Author\n${JSON.stringify(parse.error)}`)
            // return false
        }
        return true
    }
    getImagesFromPage(page: AuthorSchemaType) {
        const images = []
        if (page.avatar) {
            images.push(page.avatar.src)
        }
        return images
    }
}

export default AuthorService
