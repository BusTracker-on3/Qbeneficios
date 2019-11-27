const {ObjectId} = require('mongodb');

class CollaboratorDAO {
    constructor(request) {
        this._request = request;
    }
}

CollaboratorDAO.prototype.insertCollaborator = function(id, collaborator){
    this._request.db.collection("Collaborators", function(error, collection){
        collection.update({'_id': ObjectId(id)}, collaborator, {upsert: true});
    });
}

CollaboratorDAO.prototype.getCollaborator_by_name = function(name, tag, response){
    this._request.db.collection("Collaborators", function(error, collection){
        var myRegex = new RegExp("^" + name);
        collection.find({"name": {"$regex": myRegex}}).toArray(function(errors, result){
            var temp_aux = '';
            if(tag === 'del'){
                temp_aux = 'forms/remove_collaborator';
            } else {
                temp_aux = 'forms/update_collaborator';
            }
            response.render(temp_aux, {list: result});
        });
    });
}

CollaboratorDAO.prototype.getCollaborator_by_id = function(id, response){
    this._request.db.collection("Collaborators", function(error, collection){
        collection.find({'_id': ObjectId(id)}).toArray(function(errors, result){
            response.render('forms/register_collaborator', {validation: id, formData: result});
        });
    });
}

CollaboratorDAO.prototype.removeCollaborator = function(id, response){
    this._request.db.collection("Collaborators", function(error, collection){
        collection.remove({'_id': ObjectId(id)}, function(errors, result){
            response.redirect('/');
        });
    });
}

module.exports = function(){
    return CollaboratorDAO;
}

