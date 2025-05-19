import { Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BreadCrumbs from "../../../casinogringos-v3/src/components/BreadCrumbs";
import Content from "../../../casinogringos-v3/src/components/Content";
import Hero from "../../../casinogringos-v3/src/components/Hero";
import { replaceInternalLinkBaseUrls } from "../lib/helpers";

export default function Page({ page, authors }) {
  const breadcrumbItems = [
    {},
    {
      text: "Om Oss",
      url: `${process.env.SITE_URL}/om-oss`,
    },
  ];

  return (
    <>
      <Hero title={page.title} description={page.pageType.bannerText} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: replaceInternalLinkBaseUrls(page.seo.schema.raw),
        }}
        key="homepage-data"
      />
      <BreadCrumbs items={breadcrumbItems} />
      <Content
        blocks={page.preview ? page.preview.editorBlocks : page.editorBlocks}
      />
      <div className="bg-hero px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-2xl">Vi som jobbar på Casinogringos</h2>
          {authors.map((author) => (
            <div
              key={`author ${author.node.id}`}
              className="mb-4 rounded-md bg-white p-6"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="mt-1 overflow-hidden rounded-full">
                  <Image
                    src={author.node.avatar.url}
                    width={50}
                    height={50}
                    className="rounded-sm"
                    alt={author.node.name}
                  />
                </div>
                <div>
                  <Link prefetch={false} href={`/om-oss/${author.node.slug}`}>
                    <span className="block font-medium">
                      {author.node.name}
                    </span>
                  </Link>
                  <span className="text-slate-500 block text-sm">
                    {author.node.userType.role}
                  </span>
                </div>
                <div className="ml-auto mt-2 flex gap-2">
                  {author?.node?.seo?.social?.linkedIn && (
                    <Link
                      className="rounded-md bg-dark p-1 text-white"
                      href={author?.node?.seo?.social?.linkedIn}
                      title="LinkedIn"
                      prefetch={false}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Link>
                  )}
                  {author?.node?.userType?.email && (
                    <Link
                      className="rounded-md bg-dark p-1 text-white"
                      href={`mailto:${author?.node?.userType.email}`}
                      title="E-post"
                      target="_blank"
                      prefetch={false}
                      rel="nofollow noopener noreferrer"
                    >
                      <Mail className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
              <p className="text-slate-700">{author.node.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
