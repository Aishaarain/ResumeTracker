/**
 * @typedef {Object} FSItem
 * @property {string} id
 * @property {string} uid
 * @property {string} name
 * @property {string} path
 * @property {boolean} is_dir
 * @property {string} parent_id
 * @property {string} parent_uid
 * @property {number} created
 * @property {number} modified
 * @property {number} accessed
 * @property {number|null} size
 * @property {boolean} writable
 */

/**
 * @typedef {Object} PuterUser
 * @property {string} uuid
 * @property {string} username
 */

/**
 * @typedef {Object} KVItem
 * @property {string} key
 * @property {string} value
 */

/**
 * @typedef {"file" | "text"} ChatMessageContentType
 */

/**
 * @typedef {Object} ChatMessageContent
 * @property {ChatMessageContentType} type
 * @property {string} [puter_path]
 * @property {string} [text]
 */

/**
 * @typedef {"user" | "assistant" | "system"} ChatMessageRole
 */

/**
 * @typedef {Object} ChatMessage
 * @property {ChatMessageRole} role
 * @property {string | ChatMessageContent[]} content
 */

/**
 * @typedef {Object} PuterChatOptions
 * @property {string} [model]
 * @property {boolean} [stream]
 * @property {number} [max_tokens]
 * @property {number} [temperature]
 * @property {{ type: "function", function: { name: string, description: string, parameters: { type: string, properties: {} } }[] }} [tools]
 */

/**
 * @typedef {Object} AIResponse
 * @property {number} index
 * @property {{ role: string, content: string | any[], refusal: string|null, annotations: any[] }} message
 * @property {any|null} logprobs
 * @property {string} finish_reason
 * @property {{ type: string, model: string, amount: number, cost: number }[]} usage
 * @property {boolean} via_ai_chat_service
 */
