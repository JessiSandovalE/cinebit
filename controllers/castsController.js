let Cast = require('../models/castModel');

let castController = {};

castController.getAll = async () => {
  return new Promise((resolve, reject) => {
    Cast.find((err, data) => {
      if (err) reject(err);
      resolve(data);
    })
  });
}

castController.getFindId = async (id) => {
  return new Promise(async (resolve, reject) => {
    Cast.findById(id, (err, data) => {
      if (err) reject(err);
      resolve(data);
    })
  })
}

castController.create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Cast.create(body);
      resolve(data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

castController.edit = async (id, body) => {
  return new Promise(async (resolve, reject) => {
    try {

      await Cast.findOneAndUpdate({
        _id: id
      }, body, {
        new: true,
        upsert: true
      });
      let created = await Cast.findOne({
        _id: id
      });

      resolve(created);

    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

castController.delete = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      Cast.findOneAndRemove({
        _id: id
      }).then((data) => {
        if (data) {
          resolve({
            message: `Registro eliminado - id: ${id}`
          });
        } else {
          reject({
            "success": false,
            data: "no such cast exist"
          });
        }
      }).catch((err) => {
        reject(err);
      })

    } catch (error) {
      console.error(error);
      reject(error)
    }
  });
}

module.exports = castController;