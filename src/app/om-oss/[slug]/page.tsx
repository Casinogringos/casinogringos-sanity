import { getAuthorBySlug, getStaticParams } from "@/src/lib/api";
import { notFound } from "next/navigation";
import Author from "@/src/app/Author";
import { Metadata } from "next";
import { AuthorSchemaType } from "@/src/schemas/author";

type Params = Promise<{ slug: string }>;

export async function generateMetadata(props: { params: Params }) {
    const params = await props.params;
    const author: AuthorSchemaType = await getAuthorBySlug({ slug: params?.slug });
    const metadata: Metadata = {
        title: author.seoTitle,
        description: author.seoDescription,
        alternates: {
            canonical: author.canonical
        },
        openGraph: {
            title: author.seoTitle,
            description: author.seoDescription,
            url: author.canonical,
            locale: "sv_SE",
            images: [
                {
                    url: author.avatar?.src,
                    alt: author.firstName + ' ' + author.lastName,
                    width: 1200,
                    height: 630,
                },
            ],
        },
    };

    return metadata;
}

export default async function AuthorItem(props: { params: Params }) {
    const params = await props.params;
    const author = await getAuthorBySlug({ slug: params?.slug });
    if (!author) {
        return notFound()
    }
    return <Author author={author} />
}

export async function generateStaticParams() {
    const authors: AuthorSchemaType[] = await getStaticParams("authors");

    return authors.map(({ slug }) => ({ slug }));
}
