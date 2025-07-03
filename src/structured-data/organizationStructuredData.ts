export const getOrganizationStructuredData = () => {
  return {
    "@type": "Organization",
    "@id": "https://casinogringos.se/#organization",
    "name": "Casinogringos",
    "url": "https://casinogringos.se/",
    "logo": {
      "@type": "ImageObject",
      "inLanguage": "sv-SE",
      "@id": "https://casinogringos.se/#/schema/logo/image/",
      "url": "https://casinogringos.se/casinogringos.png",
      "contentUrl": "https://casinogringos.se/casinogringos.png",
      "width": 250,
      "height": 118,
      "caption": "Casinogringos"
    },
    "image": {
      "@id": "https://casinogringos.se/#/schema/logo/image/"
    },
    "sameAs": [
      "https://www.facebook.com/Casinogringos",
      "https://x.com/CasinoGringos",
      "https://www.instagram.com/casinogringos",
      "https://www.youtube.com/channel/UCeFbFMkDfTlLayuZmk_aXiA/"
    ]
  }
}