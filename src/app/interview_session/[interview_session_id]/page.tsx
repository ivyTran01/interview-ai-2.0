'use client';
import {
    AIBranch,
    AIBranchMessages,
    AIBranchNext,
    AIBranchPage,
    AIBranchPrevious,
    AIBranchSelector,
} from '@/components/ui/shadcn-io/ai/branch';
import {
    AIConversation,
    AIConversationContent,
    AIConversationScrollButton,
} from '@/components/ui/shadcn-io/ai/conversation';
import {
    AIInput,
    AIInputButton,
    AIInputModelSelect,
    AIInputModelSelectContent,
    AIInputModelSelectItem,
    AIInputModelSelectTrigger,
    AIInputModelSelectValue,
    AIInputSubmit,
    AIInputTextarea,
    AIInputToolbar,
    AIInputTools,
} from '@/components/ui/shadcn-io/ai/input';
import { AIMessage, AIMessageAvatar, AIMessageContent } from '@/components/ui/shadcn-io/ai/message';
import { AIResponse } from '@/components/ui/shadcn-io/ai/response';
import {
    AISource,
    AISources,
    AISourcesContent,
    AISourcesTrigger,
} from '@/components/ui/shadcn-io/ai/source';
import { AISuggestion, AISuggestions } from '@/components/ui/shadcn-io/ai/suggestion';
import {
    CameraIcon,
    FileIcon,
    GlobeIcon,
    ImageIcon,
    MicIcon,
    PlusIcon,
    ScreenShareIcon,
} from 'lucide-react';
import Image from 'next/image';
import { type FormEventHandler, useState } from 'react';
import { toast } from 'sonner';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChatMessage } from "@/models/ai_chat_message";
import { useAuth } from "@/context/AuthContext";


const models = [
    { id: 'gpt-5', name: 'GPT-5', provider: 'openai.com' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'openai.com' },
    { id: 'claude-2', name: 'Claude 2', provider: 'anthropic.com' },
    { id: 'claude-instant', name: 'Claude Instant', provider: 'anthropic.com' },
    { id: 'palm-2', name: 'PaLM 2', provider: 'google.com' },
    { id: 'llama-2-70b', name: 'Llama 2 70B', provider: 'meta.com' },
    { id: 'llama-2-13b', name: 'Llama 2 13B', provider: 'meta.com' },
    { id: 'cohere-command', name: 'Command', provider: 'cohere.com' },
    { id: 'mistral-7b', name: 'Mistral 7B', provider: 'mistral.ai' },
];
const suggestions = [
    'What are the latest trends in AI?',
    'How does machine learning work?',
    'Explain quantum computing',
    'Best practices for React development',
    'Tell me about TypeScript benefits',
    'How to optimize database queries?',
    'What is the difference between SQL and NoSQL?',
    'Explain cloud computing basics',
];
const Example = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [model, setModel] = useState<string>(models[0].id);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [text, setText] = useState<string>('');
    const [useWebSearch, setUseWebSearch] = useState<boolean>(false);
    const [useMicrophone, setUseMicrophone] = useState<boolean>(false);
    const [status, setStatus] = useState<
        'submitted' | 'streaming' | 'ready' | 'error'
    >('ready');

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        if (!text) return;

        // Add this new user message to the message list so we can render the message immediately:
        const newUserMessage = {
            from: "user" as const,
            versions: [{ id: '1', content: text }],
            avatar: user!.photoURL!,
            name: user!.displayName!,
        };
        setChatMessages((prev) => [...prev, newUserMessage]);
        setStatus("submitted");

        try {
            const res = await fetch("/api/ai_chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    input: text,
                    prev_response_id: sessionId,
                    model: model,
                }),
            });
            setStatus("streaming");

            const data = await res.json();
            if (data && data.res_content) {
                const reply = data.res_content;
                setSessionId(data.res_id);

                const newAssistantMessage = {
                    from: "assistant" as const,
                    versions: [{ id: '1', content: reply }],
                    avatar: "https://github.com/openai.png",
                    name: "OpenAI",
                };

                setChatMessages((prev) => [...prev, newAssistantMessage]);
                setStatus("ready");
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }

        setText("");
    };

    const handleFileAction = (action: string) => {
        toast.success('File action', {
            description: action,
        });
    };
    const handleSuggestionClick = (suggestion: string) => {
        toast.success('Suggestion clicked', {
            description: suggestion,
        });
        setStatus('submitted');
        setTimeout(() => {
            setStatus('streaming');
        }, 200);
        setTimeout(() => {
            setStatus('ready');
        }, 2000);
    };

    return (
        <Card className="w-full max-w-[90vw] h-[90vh] mx-auto flex flex-col overflow-hidden">
            {/* Header */}
            <CardHeader className="border-b shrink-0 flex items-center justify-between">
                <Button
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="!w-5 !h-5"/>
                </Button>

                {/*todo: pass in the interview title here*/}
                <CardTitle>Interview session</CardTitle>
            </CardHeader>

            {/* Scrollable Messages */}
            <CardContent className="flex-1 overflow-y-auto p-0">
                <div className="relative flex size-full flex-col divide-y">
                    <AIConversation>
                        <AIConversationContent>
                            {chatMessages.map(({ versions, ...message }, index) => (
                                <AIBranch defaultBranch={0} key={index}>
                                    <AIBranchMessages>
                                        {versions.map((version) => (
                                            <AIMessage from={message.from} key={version.id}>
                                                <div>
                                                    {message.sources?.length && (
                                                        <AISources>
                                                            <AISourcesTrigger count={message.sources.length} />
                                                            <AISourcesContent>
                                                                {message.sources.map((source) => (
                                                                    <AISource
                                                                        href={source.href}
                                                                        key={source.href}
                                                                        title={source.title}
                                                                    />
                                                                ))}
                                                            </AISourcesContent>
                                                        </AISources>
                                                    )}
                                                    <AIMessageContent>
                                                        <AIResponse>{version.content}</AIResponse>
                                                    </AIMessageContent>
                                                </div>
                                                <AIMessageAvatar name={message.name} src={message.avatar} />
                                            </AIMessage>
                                        ))}
                                    </AIBranchMessages>
                                    {versions.length > 1 && (
                                        <AIBranchSelector from={message.from}>
                                            <AIBranchPrevious />
                                            <AIBranchPage />
                                            <AIBranchNext />
                                        </AIBranchSelector>
                                    )}
                                </AIBranch>
                            ))}
                        </AIConversationContent>
                        <AIConversationScrollButton />
                    </AIConversation>
                </div>
            </CardContent>

            {/* Fixed Footer (Suggestions + Input) */}
            <CardFooter className="flex flex-col gap-4 border-t shrink-0">
                <AISuggestions className="px-2">
                    {suggestions.map((suggestion) => (
                        <AISuggestion
                            key={suggestion}
                            onClick={() => handleSuggestionClick(suggestion)}
                            suggestion={suggestion}
                        />
                    ))}
                </AISuggestions>

                <div className="w-full px-2 pb-2">
                    <AIInput onSubmit={handleSubmit}>
                        <AIInputTextarea
                            onChange={(event) => setText(event.target.value)}
                            value={text}
                        />
                        <AIInputToolbar className="px-2 pb-2">
                            <AIInputTools>
                                {/* Attachments dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <AIInputButton>
                                            <PlusIcon size={16} />
                                            <span className="sr-only">Add attachment</span>
                                        </AIInputButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        <DropdownMenuItem onClick={() => handleFileAction('upload-file')}>
                                            <FileIcon className="mr-2" size={16} />
                                            Upload file
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleFileAction('upload-photo')}>
                                            <ImageIcon className="mr-2" size={16} />
                                            Upload photo
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleFileAction('take-screenshot')}>
                                            <ScreenShareIcon className="mr-2" size={16} />
                                            Take screenshot
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleFileAction('take-photo')}>
                                            <CameraIcon className="mr-2" size={16} />
                                            Take photo
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                {/* Microphone button */}
                                <AIInputButton
                                    onClick={() => setUseMicrophone(!useMicrophone)}
                                    variant={useMicrophone ? 'default' : 'ghost'}
                                >
                                    <MicIcon size={16} />
                                    <span className="sr-only">Microphone</span>
                                </AIInputButton>

                                {/* Search toggle */}
                                <AIInputButton
                                    onClick={() => setUseWebSearch(!useWebSearch)}
                                    variant={useWebSearch ? 'default' : 'ghost'}
                                >
                                    <GlobeIcon size={16} />
                                    <span>Search</span>
                                </AIInputButton>

                                {/* Model selector */}
                                <AIInputModelSelect onValueChange={setModel} value={model}>
                                    <AIInputModelSelectTrigger>
                                        <AIInputModelSelectValue />
                                    </AIInputModelSelectTrigger>
                                    <AIInputModelSelectContent>
                                        {models.map((model) => (
                                            <AIInputModelSelectItem key={model.id} value={model.id}>
                                                <Image
                                                    alt={model.provider}
                                                    className="inline-flex size-4"
                                                    height={16}
                                                    src={`https://www.google.com/s2/favicons?domain=${model.provider}`}
                                                    unoptimized
                                                    width={16}
                                                />
                                                {model.name}
                                            </AIInputModelSelectItem>
                                        ))}
                                    </AIInputModelSelectContent>
                                </AIInputModelSelect>
                            </AIInputTools>

                            <AIInputSubmit disabled={!text} status={status} />
                        </AIInputToolbar>
                    </AIInput>
                </div>
            </CardFooter>
        </Card>
    )
};
export default Example;