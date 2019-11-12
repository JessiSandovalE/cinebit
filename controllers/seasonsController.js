let Season = require('../models/seasonModel');

let seasonController = {};

seasonController.getAll = async () => {
   return new Promise((resolve, reject) => {
   
    Season.find((err, data) => {
      if (err) reject(err);
      resolve(data);
    })
   });
}

seasonController.getFindId = async (id) => {
    return new Promise(async(resolve,reject) => {
        Season.findById(id, (err, data) => {
        if (err) reject(err);
        resolve(data);
      })
    });
}


seasonController.create = async (body) =>{
    return new Promise(async(resolve,reject) => {
        try {
            let data = await Season.create(body);
            resolve(data)
        } catch (error) {
            console.log(error);
            res.json(error) 
        }
    })
}

seasonController.edit = async (id, body) => {
    return new Promise(async (resolve, reject) => {
      try {
  
         await Season.findOneAndUpdate({
          _id: id
        }, body, {
          new: true,
          upsert: true
        });
        let created = await Season.findOne({
          _id: id
        });
  
        resolve(created);
  
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
  
  seasonController.delete = async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        Season.findOneAndRemove({
          _id: id
        }).then((data) => {
          if (data) {
            resolve({
              message: `Registro eliminado - id: ${id}`
            });
          } else {
            reject({
              "success": false,
              data: "no such Season exist"
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
  

module.exports = seasonController;