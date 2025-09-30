import { SectionObjectSchemaType } from "@/src/schemas/sectionObject"
import ModularContent from "./ModularContent"

const SectionObject = ({ object }: { object: SectionObjectSchemaType }) => {
    const sizeClasses = {
        xs: 'p-0',
        s: 'py-4',
        m: 'py-10',
        l: 'py-16',
        xl: 'py-20',
    }
    const backgroundColorClasses = {
        gray: 'bg-slate-500/50',
        blue: 'bg-dark',
    }
    const className = `${sizeClasses[object.size as keyof typeof sizeClasses]} ${backgroundColorClasses[object.backgroundColor as keyof typeof backgroundColorClasses]} ${object.className}`

    return <section className={className}><ModularContent objects={object.content} backgroundColor={object.backgroundColor} /></section>
}

export default SectionObject
