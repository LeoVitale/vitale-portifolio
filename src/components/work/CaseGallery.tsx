import { useState } from 'react'

interface CaseGalleryAsset {
  src: string
  width: number
  height: number
  alt: string
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

  return (
    <div className="case-gallery">
      {assets.map((asset, index) => (
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
