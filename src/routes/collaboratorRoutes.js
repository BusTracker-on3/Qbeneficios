module.exports = function(application){
    application.get('/register', function(request, response){
        application.src.controllers.collaboratorController.register(application, request, response);
    });

    application.post('/register', function(request, response){
        application.src.controllers.collaboratorController.register_collaborator(application, request, response);
    });

    application.get('/remove_collaborator', function(request, response){
        application.src.controllers.collaboratorController.remove_collaborator(application, request, response);
    });

    application.get('/remove', function(request, response){
        application.src.controllers.collaboratorController.delete(application, request, response);
    });
}