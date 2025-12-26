
const API_URL = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

export interface ChatRequest {
    message: string;
    visitor_id: string;
    session_id: string;
    chat_id: string;
    request_id: string;
    location?: string | null;
}

export const MessageService = {
    sendMessageStream: async (
        request: ChatRequest,
        onEvent: (event: any) => void,
        onError: (err: any) => void,
        onComplete: () => void,
        signal?: AbortSignal
    ) => {
        try {
            // Extract country code from location if available (simple logic matching index.js)
            let countryCode = null;
            if (request.location) {
                const parts = request.location.split(',').map(p => p.trim());
                if (parts.length >= 1) {
                    const candidate = parts[parts.length - 1].toUpperCase();
                    if (candidate.length >= 2 && candidate.length <= 3 && /^[A-Z]+$/.test(candidate)) {
                        countryCode = candidate;
                    }
                }
            }

            const payload = {
                query: request.message,
                chat_id: request.chat_id,
                location: request.location,
                country: countryCode,
                skip_logging: true
            };

            const apiKey = import.meta.env.VITE_API_KEY || '';

            const response = await fetch(`${API_URL}/chat/stream`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': apiKey
                },
                body: JSON.stringify(payload),
                signal // Allow aborting (e.g., navigation safety)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            if (!response.body) {
                throw new Error('ReadableStream not supported');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');

                // Keep the last partial line in the buffer
                buffer = lines.pop() || '';

                for (const line of lines) {
                    if (line.trim()) {
                        try {
                            const event = JSON.parse(line);
                            onEvent(event);
                        } catch (e) {
                            console.error('Error parsing event:', e, line);
                        }
                    }
                }
            }

            // Process any remaining buffer
            if (buffer.trim()) {
                try {
                    const event = JSON.parse(buffer);
                    onEvent(event);
                } catch (e) {
                    console.error('Error parsing final buffer:', e, buffer);
                }
            }

            onComplete();

        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Stream aborted');
            } else {
                onError(error);
            }
        }
    }
};
