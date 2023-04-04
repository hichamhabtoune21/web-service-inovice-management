const schema = {
  type: "object",
  properties: {
    ID_Invoice: { type: "integer" },
  },
  required: ["ID_Invoice"],
  additionalProperties: false
}
exports.schema = schema;