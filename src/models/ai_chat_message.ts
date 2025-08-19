import type { AIToolStatus } from "@/components/ui/shadcn-io/ai/tool";

export interface MessageVersion {
    id: string;
    content: string;
}

export interface MessageSource {
    href: string;
    title: string;
}

export interface MessageReasoning {
    content: string;
    duration: number;
}

export interface MessageTool {
    name: string;
    description: string;
    status: AIToolStatus;
    parameters: Record<string, unknown>;
    result?: string;
    error?: string;
}

export interface ChatMessage {
    from: "user" | "assistant";
    versions: MessageVersion[];
    sources?: MessageSource[];
    reasoning?: MessageReasoning;
    tools?: MessageTool[];
    avatar: string;
    name: string;
}
