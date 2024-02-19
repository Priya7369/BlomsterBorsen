from .views import TenderResource

def tender_urls(api):
    api.add_resource(TenderResource, '/api/tender', '/api/tender/<int:tender_id>')