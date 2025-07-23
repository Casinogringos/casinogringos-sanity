import { AuthorSchemaType, AuthorSchema } from '@/src/schemas'
import fs from 'fs'

class AuthorService {
    validateAuthor(author: AuthorSchemaType) {
        const parse = AuthorSchema.safeParse(author)
        if (!parse.success) {
            console.log(`Invalid author:\n`, parse.error)
            fs.writeFileSync('structuredDataError.log', `\n\nInvalid Author\n${JSON.stringify(parse.error)}`)
            // return false
        }
        return true
    }
}

export default AuthorService
