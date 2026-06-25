import { useState, type ReactNode } from 'react'

/**
 * Resilient image: shows an elegant gradient immediately, fades the real photo
 * in once it loads, and simply keeps the gradient if the URL ever fails — so the
 * layout never shows a broken-image icon. Every photo URL is centralized in
 * `src/images.ts`, so any image is a one-line swap.
 */
export function Photo({
  src,
  alt,
  className = '',
  gradient = 'from-sky-100 via-slate-100 to-slate-200',
  overlay = false,
  eager = false,
  children,
}: {
  src: string
  alt: string
  className?: string
  gradient?: string
  overlay?: boolean
  eager?: boolean
  children?: ReactNode
}) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} ${className}`}>
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      {/* faint shimmer placeholder shown until/if no photo */}
      {!loaded && !failed && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/30 to-transparent" />
      )}
      {overlay && <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-brand-ink/10 to-transparent" />}
      {children && <div className="relative h-full w-full">{children}</div>}
    </div>
  )
}
