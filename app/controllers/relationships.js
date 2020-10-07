const relationshipsModel = require('../models/relationships');

module.exports = {
    relationships: function(request,response){
        relationshipsModel.find(function(error,result){
            if(error){
                return response.status(500).send(error);
            }else{
                return response.status(200).send(result);
            }
        });
    }
};