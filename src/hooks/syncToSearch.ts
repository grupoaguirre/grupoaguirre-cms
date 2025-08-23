import { CollectionAfterChangeHook } from 'payload'
import { SearchItem, Tag, Category } from '../payload-types'

const collectionToTypeMap: Record<string, SearchItem['type']> = {
  blog: 'blog',
  documents: 'document',
  legalResources: 'resource',
}

export const syncToSearch: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req: { payload },
  collection,
}) => {
  const docType = collectionToTypeMap[collection?.slug]
  if (!docType) {
    payload.logger.warn(
      `No se encontró un mapeo de tipo para la colección '${collection?.slug}'. No se sincronizará con 'search-items'.`,
    )
    return
  }

  if (operation === 'create' || operation === 'update') {
    let categoryName = 'General'
    if (doc.category) {
      if (typeof doc.category === 'string') {
        categoryName = doc.category
      } else if (typeof doc.category === 'object' && doc.category.name) {
        categoryName = (doc.category as Category).name
      }
    }

    let contentText = ''
    if (doc.contentHtml) {
      contentText = doc.contentHtml.replace(/<[^>]*>/g, '').trim()
    } else if (doc.content) {
      try {
        contentText = JSON.stringify(doc.content)
      } catch {
        contentText = ''
      }
    }

    let tagsText = ''
    if (doc.tags && Array.isArray(doc.tags)) {
      const tagNames = await Promise.all(
        doc.tags.map(async (tag: string | Tag) => {
          if (typeof tag === 'string') {
            try {
              const tagDoc = await payload.findByID({
                collection: 'tags',
                id: tag,
              })
              return tagDoc.name || ''
            } catch {
              return ''
            }
          } else if (tag && typeof tag === 'object' && tag.name) {
            return tag.name
          }
          return ''
        }),
      )
      tagsText = tagNames.filter(Boolean).join(' ')
    }

    const searchContent = [
      doc.title || doc.titulo || '',
      doc.excerpt || doc.descripcion || '',
      categoryName,
      tagsText,
      contentText,
    ]
      .filter(Boolean)
      .join(' ')
      .trim()

    let itemUrl = '/'
    if (collection?.slug === 'blog') {
      itemUrl = `/blog/${doc.slug}`
    } else if (collection?.slug === 'documents') {
      itemUrl = `/documents/${doc.slug || doc.id}`
    } else if (collection?.slug === 'legal-resources') {
      itemUrl = `/legal-resources/${doc.slug}`
    }

    const searchItemData = {
      type: docType,
      originalId: doc.id,
      category: categoryName,
      title: doc.title || doc.titulo || 'Sin título',
      excerpt: doc.excerpt || doc.descripcion || '',
      url: itemUrl,
      tags: doc.tags?.map((tag: string | Tag) => (typeof tag === 'object' ? tag.id : tag)) || [],
      searchContent: searchContent,
      isActive: doc.status === 'published' || doc.esPublico === true,
    }

    try {
      const existingSearchItem = await payload.find({
        collection: 'search-items',
        where: {
          originalId: {
            equals: doc.id,
          },
        },
        limit: 1,
      })

      if (existingSearchItem.docs.length > 0) {
        const itemId = existingSearchItem.docs[0].id
        await payload.update({
          collection: 'search-items',
          id: itemId,
          data: searchItemData,
        })
      } else {
        await payload.create({
          collection: 'search-items',
          data: searchItemData,
        })
      }
    } catch (error) {
      payload.logger.error(
        `Error al sincronizar el documento ID ${doc.id} con 'search-items'`,
        error,
      )
    }
  }
}
