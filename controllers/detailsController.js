let Detail = require('../models/detailModel');

let detailsController = {};


detailsController.getAll = async () => {
  return new Promise((resolve, reject) => {
    try {
      Detail.find((err, data) => {
        if (err) reject(err);
        resolve(data);
      })
    } catch (error) {
      reject(error);
    }
  });
}

detailsController.getFindId = async (id) => {
  return new Promise((resolve, reject) => {
    try {
      Detail.findById(req.params.id, (err, data) => {
        if (err) resolve(err);
        resolve(data);
      })
    } catch (error) {
      reject(error);
    }
  });
}

detailsController.createDetail = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await create(body);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

let create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Detail.create(body);
      resolve(data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  })
}

detailsController.editDetail = async (id, body) => {
  return new Promise(async (resolve, reject) => {
    try {

      let data = await Detail.findOneAndUpdate({
        _id: id
      }, body, {
        new: true,
        upsert: true
      });
      let created = await Detail.findOne({
        _id: id
      });

      resolve(created);

    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

detailsController.deleteDetail = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      Detail.findOneAndRemove({
        _id: id
      }).then((data) => {
        if (data) {
          resolve({
            message: `Registro eliminado - id: ${id}`
          });
        } else {
          reject({
            "success": false,
            data: "no such detail exist"
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

module.exports = detailsController;