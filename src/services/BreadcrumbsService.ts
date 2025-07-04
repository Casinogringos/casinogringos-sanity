import { Breadcrumbs } from '@/src/types'
import { BreadcrumbsSchema } from '@/src/schemas'
import fs from 'fs'

class BreadcrumbsService {
    validateSchema(breadcrumbs: Breadcrumbs) {
        const parse = BreadcrumbsSchema.safeParse(breadcrumbs)
        if (!parse) return false
        if (!parse.success) {
            console.error(`Invalid breadcrumbs:\n`, parse.error)
            fs.writeFileSync('structuredDataError.log', `\n\nInvalid Breadcrumbs\n${JSON.stringify(parse.error)}`)
            return false
        }
        return true
    }
}

export default BreadcrumbsService