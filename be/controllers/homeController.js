const { Item, Sequelize } = require('../models')
const Op = Sequelize.Op

exports.itemList = async (req, res) => {
  const { filter, sort } = req.body

  try {
    const filters = {}

    if (filter) {
      if (filter.title) {
        filters.title = {
          [Op.like]: `%${filter.title}%`
        }
      }

      if (filter.date && (filter.date.start || filter.date.end)) {
        filters.date = {}

        if (filter.date.start) {
          filters.date[Op.gte] = filter.date.start
        }
        if (filter.date.end) {
          filters.date[Op.lte] = filter.date.end
        }
      }
    }

    const sorts = []

    if (sort) {
      if (sort.id) {
        sorts.push([sort.id, sort.order])
      }
    }

    let items = await Item.findAll({
      where: filters,
      order: sorts
    })

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
