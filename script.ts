import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const fetchDocuments = () =>
  client.fetch(
    '*[_type == "news-pages" && slug.current match "/nyheter/*"]{_id, slug}'
  )

const buildPatches = (docs) =>
  docs.map((doc) => ({
    id: doc._id,
    patch: {
      set: {
        'slug.current': doc.slug.current.replace('/nyheter/', ''),
      },
    },
  }))

const createTransaction = (patches) =>
  patches.reduce(
    (tx, patch) => tx.patch(patch.id, patch.patch),
    client.transaction()
  )

const migrateDocuments = async () => {
  const documents = await fetchDocuments()
  const patches = buildPatches(documents)

  if (patches.length === 0) {
    console.log('No documents to migrate')
    return
  }

  console.log(`Migrating ${patches.length} documents...`)
  const transaction = createTransaction(patches)
  await transaction.commit(true)
  console.log('Done!')
}

migrateDocuments().catch((err) => {
  console.error(err)
  process.exit(1)
})
