interface Message {
	message_id: number;
	from: User;
	chat: User;
	date: number;
	text: string;
	entities: Entity[];
}

interface User {
	id: number;
	is_bot: boolean;
	first_name: string;
	last_name?: string; // Optional last_name
	username: string;
	language_code: string;
}

interface Entity {
	offset: number;
	length: number;
	type: string;
}

export interface TelegramMessage {
	update_id: number;
	message: Message;
}
