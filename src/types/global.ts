export type AcceptedTypes = {
  [name: string]: boolean
}

export type GalleryImages = {
  file: File
  url: string
  name: string
}

export type FileType = null | React.ChangeEvent<HTMLInputElement>
