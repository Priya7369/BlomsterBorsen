from marshmallow import Schema, fields, validate

class CombinedForestOwnerDataSchema(Schema):
    username = fields.String(required=True, validate=validate.Length(min=1, max=50))
    password = fields.String(required=True, validate=validate.Length(min=1, max=100))
    email = fields.Email(required=True, validate=validate.Length(min=1, max=100))
    role = fields.String(required=True, validate=validate.OneOf(['Forest Owner', 'Botanical Owner']))
    subscription_type = fields.String(required=True, validate=validate.OneOf(['Free', 'Premium']))

    owner_name = fields.String(required=True, validate=validate.Length(min=1, max=100))
    contact_number = fields.String(validate=validate.Length(max=20))
    address = fields.String(validate=validate.Length(max=200))

    forest_name = fields.String(required=True, validate=validate.Length(min=1, max=100))
    location = fields.String(required=True, validate=validate.Length(min=1, max=100))
    soil_type = fields.String(required=True, validate=validate.Length(min=1, max=50))


class CombinedBotanicalOwnerDataSchema(Schema):
    username = fields.String(required=True, validate=validate.Length(min=1, max=50))
    password = fields.String(required=True, validate=validate.Length(min=1, max=100))
    email = fields.Email(required=True, validate=validate.Length(min=1, max=100))
    role = fields.String(required=True, validate=validate.OneOf(['Forest Owner', 'Botanical Owner']))
    subscription_type = fields.String(required=True, validate=validate.OneOf(['Free', 'Premium']))

    owner_name = fields.String(required=True, validate=validate.Length(min=1, max=100))
    contact_number = fields.String(validate=validate.Length(max=20))
    address = fields.String(validate=validate.Length(max=200))
    botanical_name = fields.String(required=True, validate=validate.Length(min=1, max=100))
    location = fields.String(required=True, validate=validate.Length(min=1, max=100))
