export type StringRange = {
  start: String,
  end: String
}

export type Column = {
  id: String,
  name: String,
  filter?: Boolean | String,
  sort?: Boolean,
  width?: String,
  required?: Boolean
}
export type Sort = {
  id: Boolean | String,
  order: String
}

export type HomeData = {
  id: Number,
  title: String,
  date: String,
  summary: String
}

export type HomeFilter = {
  title?: String,
  date?: StringRange
}
