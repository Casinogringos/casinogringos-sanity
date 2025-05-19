import Date from "../../../casinogringos-v3/src/components/Date";
import Link from "next/link";
import Container from "../../../casinogringos-v3/src/components/Container";
import ImageComponent from "../../../casinogringos-v3/src/components/ImageComponent";

export default function GuidesIndex({ guides }) {
  return (
    <Container className="py-6 lg:py-12">
      <h1 className="text-3xl font-bold">Guider</h1>
      <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-x-4 gap-y-6 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
        {guides.map((post) => (
          <div
            key={`guide-${post.node.id}`}
            className="flex flex-col items-start"
          >
            <div className="relative flex h-24 w-full overflow-hidden rounded-md lg:h-44">
              <ImageComponent
                image={post?.node?.featuredImage?.node}
                width={400}
                className={"min-h-full min-w-full object-cover"}
              />
            </div>
            <div className="mt-3 flex items-center gap-x-4 text-xs">
              <time dateTime={post.node.date} className="text-gray500">
                <Date dateString={post.node.date} />
              </time>
            </div>
            <Link href={post.node.uri} prefetch={false}>
              <h3 className="text-gray-900 group-hover:text-gray-600 mt-1 text-lg font-semibold leading-6">
                {post.node.title}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
}
