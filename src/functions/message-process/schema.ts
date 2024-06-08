// export default {
// 	type: "object",
// 	properties: {
//     name: { type: "string" },
//   },
// 	required: ["name"],
// } as const;

// export default {
// 	type: "object",
// 	properties: {
// 		update_id: { type: "number" },
// 		message: {
// 			message_id: { type: "number" },
// 			from: {
// 				id: { type: "number" },
// 				is_bot: { type: "boolean" },
// 				first_name: { type: "string" },
// 				last_name: { type: "string" },
// 				username: { type: "string" },
// 				language_code: { type: "string" },
// 			},
// 			chat: {
// 				id: { type: "number" },
// 				first_name: { type: "string" },
// 				last_name: { type: "string" },
// 				username: { type: "string" },
// 				type: { type: "string" },
// 			},
// 			date: { type: "number" },
// 			text: { type: "string" },
// 			entities: {
// 				offset: { type: "number" },
// 				length: { type: "number" },
// 				type: { type: "string" },
// 			},
// 		},
// 	},
// 	additionalProperties: true,
// } as const;

export default { type: "object", additionalProperties: true } as const;
