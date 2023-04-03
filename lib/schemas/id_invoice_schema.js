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
    ID_Invoice: { type: "integer" },
  },
  required: ["User","ID_Invoice"],
  additionalProperties: false
}
exports.schema = schema;