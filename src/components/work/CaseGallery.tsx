import { useState } from 'react'

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
  index,
  onFailure,
}: {
  asset: CaseGalleryAsset
  index: number
  onFailure: () => void
}) {
  return (
    <figure className={`case-gallery__item case-gallery__item--${index % 2 === 0 ? 'wide' : 'detail'}`}>
      <img
        alt={asset.alt}
        height={asset.height}
        loading="lazy"
        onError={onFailure}
        src={asset.src}
        width={asset.width}
      />
    </figure>
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
              <div className="case-gallery__sequence">
                {group.assets.map((asset, index) => (
                  <CaseImage
                    asset={asset}
                    index={index}
                    key={asset.src}
                    onFailure={() => setHasFailure(true)}
                  />
                ))}
              </div>
            </section>
          ))
        : assets.map((asset, index) => (
            <CaseImage
              asset={asset}
              index={index}
              key={asset.src}
              onFailure={() => setHasFailure(true)}
            />
          ))}
      {hasFailure ? <p role="status">{unavailableMessage}</p> : null}
    </div>
  )
}
