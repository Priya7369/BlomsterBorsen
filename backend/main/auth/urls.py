from .views import ForestOwnerResource,LoginResource,BotanicalOwnerResource

def auth_urls(api):
    api.add_resource(ForestOwnerResource, '/api/forest_owner')
    api.add_resource(BotanicalOwnerResource, '/api/botanical_owner')
    api.add_resource(LoginResource, '/api/login')
