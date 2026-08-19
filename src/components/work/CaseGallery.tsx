import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface CaseGalleryAsset {
  src: string
  width: number
  height: number
  alt: string
  group?: {
    id: string
    label: string
  }
}

interface CaseGalleryProps {
  assets: readonly CaseGalleryAsset[]
  unavailableMessage: string
}

function CaseImage({
  asset,
  hidden = false,
  onFailure,
}: {
  asset: CaseGalleryAsset
  hidden?: boolean
  onFailure: () => void
}) {
  return (
    <figure className="case-gallery__item" hidden={hidden}>
      <img
        alt={asset.alt}
        draggable={false}
        height={asset.height}
        loading="lazy"
        onError={onFailure}
        src={asset.src}
        width={asset.width}
      />
    </figure>
  )
}

function CaseCarousel({
  assets,
  onFailure,
}: {
  assets: readonly CaseGalleryAsset[]
  onFailure: () => void
}) {
  const { t } = useTranslation('cases')
  const [index, setIndex] = useState(0)
  const [pointerX, setPointerX] = useState<number | null>(null)

  if (assets.length === 1) {
    return <CaseImage asset={assets[0]} onFailure={onFailure} />
  }

  const go = (delta: number) => {
    setIndex((current) => (current + delta + assets.length) % assets.length)
  }

  return (
    <div
      aria-label={t('carousel.label')}
      aria-roledescription="carousel"
      className="case-carousel"
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') {
          event.preventDefault()
          go(1)
        }
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          go(-1)
        }
      }}
      onPointerDown={(event) => {
        if ((event.target as HTMLElement).closest('button')) return
        event.currentTarget.setPointerCapture(event.pointerId)
        setPointerX(event.clientX)
      }}
      onPointerUp={(event) => {
        if (pointerX == null) return
        const delta = event.clientX - pointerX
        if (Math.abs(delta) >= 40) go(delta < 0 ? 1 : -1)
        setPointerX(null)
      }}
      role="region"
      tabIndex={0}
    >
      {assets.map((asset, assetIndex) => (
        <CaseImage
          asset={asset}
          hidden={assetIndex !== index}
          key={asset.src}
          onFailure={onFailure}
        />
      ))}
      <div className="case-carousel__controls">
        <button onClick={() => go(-1)} type="button">
          {t('carousel.previous')}
        </button>
        <p aria-live="polite">
          {t('carousel.position', { current: index + 1, total: assets.length })}
        </p>
        <button onClick={() => go(1)} type="button">
          {t('carousel.next')}
        </button>
      </div>
    </div>
  )
}

export function CaseGallery({ assets, unavailableMessage }: CaseGalleryProps) {
  const [hasFailure, setHasFailure] = useState(false)
  const groupedAssets = assets.reduce<
    Array<{ id: string; label: string; assets: CaseGalleryAsset[] }>
  >((groups, asset) => {
    if (!asset.group) return groups
    const currentGroup = groups.at(-1)
    if (currentGroup?.id === asset.group.id) {
      currentGroup.assets.push(asset)
    } else {
      groups.push({ ...asset.group, assets: [asset] })
    }
    return groups
  }, [])
  const hasGroups = groupedAssets.length > 0
  const recordFailure = () => setHasFailure(true)

  return (
    <div className="case-gallery">
      {hasGroups
        ? groupedAssets.map((group) => (
            <section
              className="case-gallery__group"
              data-gallery-group={group.id}
              key={group.id}
            >
              <h3>{group.label}</h3>
              <CaseCarousel assets={group.assets} onFailure={recordFailure} />
            </section>
          ))
        : (
            <CaseCarousel assets={assets} onFailure={recordFailure} />
          )}
      {hasFailure ? <p role="status">{unavailableMessage}</p> : null}
    </div>
  )
}
