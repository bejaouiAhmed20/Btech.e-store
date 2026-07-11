import { useEffect } from 'react'

interface SeoProps {
  title: string
  description: string
}

function setMetaTag(name: string, content: string, isProperty = false) {
  const attr = isProperty ? 'property' : 'name'
  let tag = document.querySelector(`meta[${attr}="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    document.title = title
    setMetaTag('description', description)
    setMetaTag('og:title', title, true)
    setMetaTag('og:description', description, true)
    setMetaTag('twitter:title', description)
  }, [title, description])

  return null
}
