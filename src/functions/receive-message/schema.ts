// export default {
//   type: "object",
//   properties: {
//     name: { type: 'string' }
//   },
//   required: ['name']
// } as const;

export default { type: "object", additionalProperties: true } as const;
