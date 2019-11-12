let Episode = require('../models/episodeModel');

let episodeController = {};

episodeController.getAll = async () => {
    return new Promise ((resolve,reject) => {
        Episode.find((err, data) => {
          if (err) reject(err);
          resolve(data);
        })
  
    });
}

episodeController.getFindId = async (id) => {
    return new Promise(async(resolve,reject) => {
        Episode.findById(id, (err, data) => {
        if (err) reject(err);
        resolve(data);
      })
    })
}

episodeController.create = async (body) =>{
    return new Promise(async(resolve,reject) => {
        try {
            let data = await Episode.create(body);
            resolve(data)
        } catch (error) {
            console.log(error);
            res.json(error) 
        }
    })
}


episodeController.edit = async (id, body) => {
    return new Promise(async (resolve, reject) => {
      try {
  
         await Episode.findOneAndUpdate({
          _id: id
        }, body, {
          new: true,
          upsert: true
        });
        let created = await Episode.findOne({
          _id: id
        });
  
        resolve(created);
  
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
  
  episodeController.delete = async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        Episode.findOneAndRemove({
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
  


module.exports = episodeController;