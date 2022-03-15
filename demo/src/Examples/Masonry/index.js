import React, {useCallback, useState} from "react"
import {Html} from "react-demo-page"

import html from "./index.md"
import Masonry from "../../../../src"

const baseImages = [
  "https://picsum.photos/200/300?image=1050",
  "https://picsum.photos/400/400?image=1039",
  "https://picsum.photos/400/400?image=1080",
  "https://picsum.photos/200/200?image=997",
  "https://picsum.photos/500/400?image=287",
  "https://picsum.photos/400/500?image=955",
  "https://picsum.photos/200/300?image=916",
  "https://picsum.photos/300/300?image=110",
  "https://picsum.photos/300/300?image=206",
]

const ExampleMasonry = () => {
  const [hidden, setHidden] = useState(false)
  const [images, setImages] = useState(baseImages)

  const updateImages = useCallback(() => {
    // const images = baseImages.splice(0, 4);

    // setImages(images);
    setHidden(!hidden)
  }, [hidden])

  return (
    <div>
      <button onClick={updateImages}>Update Images</button>
      <Html html={html} color="#44B39D" />
      <Masonry columnsCount={3} gutter="10px">
        <img src={images[0]} style={{width: "100%", display: "block"}} />
        {!hidden && (
          <img src={images[1]} style={{width: "100%", display: "block"}} />
        )}
        <img src={images[2]} style={{width: "100%", display: "block"}} />
      </Masonry>
    </div>
  )
}

export default ExampleMasonry
