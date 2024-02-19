from .views import DelayedResponseResource

def delay_urls(api):
    api.add_resource(DelayedResponseResource, '/api/delayed-response')