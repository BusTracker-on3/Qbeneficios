class HomeDAO {
    constructor(request){
        this._request = request;
    }
}

HomeDAO.prototype.get_highest_salary = function(response){
    var temp = [];
    this._request.db.collection("Collaborators", function(error, collection){
        collection.aggregate([
            {
                '$group': {'_id': 1, 'salary': {'$max': "$salary"}, 'count': {'$sum': 1}}
            }
        ]).toArray(function(error, result){
            temp.push(result);
        });
    });

    this._request.db.collection("Roles", function(err, coll){
        coll.aggregate([
            {
                '$group': {'_id': 1, 'count': {'$sum': 1}}
            }
        ]).toArray(function(er, res){
            response.render('home/index', {message: '', flag: '', collaborator: temp[0], role: res});
        });
    });
}

module.exports = function(){
    return HomeDAO;
}