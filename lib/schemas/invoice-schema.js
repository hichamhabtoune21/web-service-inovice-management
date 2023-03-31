const schema = {
    type: "object",
    properties: {
      'Progressive number': {type: "integer"},
      'Issuing date': {type: "string"},
      'Business name': {type: 'string'},
       Amount: {type: 'integer'},
      'Payment type': {enum: ["Cash", "Credit Card", "Bank Transfer"]
    }
    },
    required: ["Progressive number","Issuing date","Business name","Amount","Payment type"],
    additionalProperties: false

}
exports.schema=schema;