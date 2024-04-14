const { Item } = require('../models')

exports.itemList = async (req, res) => {
  const { filter } = req.body

  try {
    const filters = {}

    if (filter) {
      if (filter.title) {
        filters.title = {
          $like: '%' + filter.title + '%'
        }
      }

      if (filter.date && (filter.date.start || filter.date.end)) {
        filters.date = {}

        if (filter.date.start) {
          filters.date.$gte = new Date(filter.date.start);
        }
        if (filter.date.end) {
          filters.date.$lte = new Date(filter.date.start);
        }
      }
    }

    let items = await Item.findAll(filters)

    return res.status(200).json({
      list: items
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

exports.itemInsert = async (req, res) => {
  const { title, date, summary } = req.body

  try {
    let item = await Item.create({
      title,
      date,
      summary
    })

    return res.status(200).json({
      id: item.id
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}
