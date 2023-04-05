const schema = {
  type: "object",
  properties: {
    ID_Invoice: { type: "string" },
    'Progressive number': { type: "integer" },
    'Issuing date': { type: "string" },
    'Business name': { type: 'string' },
    Amount: { type: 'integer' },
    'Payment type': {
      enum: ["Cash", "Credit Card", "Bank Transfer"]
    },
    ID_Client:{type: "integer"},
  },
  required: ["Progressive number", "Issuing date", "Business name", "Amount", "Payment type"],
  additionalProperties: false
}
exports.schema = schema;