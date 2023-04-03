const schema = {
  type: "object",
  properties: {
    User: {
      type: "object",
      properties: {
        Email: { type: "string" },
        Password: { type: "string" }
      },
      required:["Email","Password"],
    },
    ID_Invoice: { type: "string" },
    'Progressive number': { type: "integer" },
    'Issuing date': { type: "string" },
    'Business name': { type: 'string' },
    Amount: { type: 'integer' },
    'Payment type': {
      enum: ["Cash", "Credit Card", "Bank Transfer"]
    }
  },
  required: ["Progressive number", "Issuing date", "Business name", "Amount", "Payment type", "User"],
  additionalProperties: false
}
exports.schema = schema;