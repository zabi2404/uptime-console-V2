import { useState } from "react";
import { Mail, MessageSquare, Webhook, Check, Loader2 } from "lucide-react";
import { useSendNotification } from "@/Hooks/useSendNotification";
import { useSelector } from "react-redux";

import type { RootState } from "@/redux/store";

type ChannelId = "email" | "sms" | "webhook";

interface ChannelState {
    enabled: boolean;
    value: string;
    testStatus: "idle" | "testing" | "sent" | "failed";
}

interface ChannelConfig {
    id: ChannelId;
    icon: typeof Mail;
    title: string;
    description: string;
    placeholder: string;
    inputType: string;
    service: string;
}

const CHANNELS: ChannelConfig[] = [
    {
        id: "email",
        icon: Mail,
        title: "Email",
        description: "Get an alert sent to your inbox when a check fails.",
        placeholder: "you@example.com",
        inputType: "email",
        service: "Amazon SNS",
    },
    {
        id: "sms",
        icon: MessageSquare,
        title: "SMS",
        description: "Get a text message the moment a service goes down.",
        placeholder: "+92 300 1234567",
        inputType: "tel",
        service: "Amazon SNS",
    },
    {
        id: "webhook",
        icon: Webhook,
        title: "Webhook",
        description: "Post an event to your own endpoint — Slack, Discord, or a custom URL.",
        placeholder: "https://hooks.example.com/vigil",
        inputType: "url",
        service: "SNS → Lambda",
    },
];


const initialState: Record<ChannelId, ChannelState> = {
    email: { enabled: true, value: "", testStatus: "idle" },
    sms: { enabled: false, value: "", testStatus: "idle" },
    webhook: { enabled: false, value: "", testStatus: "idle" },
};
export default function NotificationsPage() {
    
    const [channels, setChannels] = useState(initialState);
    
    const updateChannel = (id: ChannelId, patch: Partial<ChannelState>) => {
        setChannels((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
    };
    
    const toggleChannel = (id: ChannelId) => {
        updateChannel(id, { enabled: !channels[id].enabled });
    };


    const {user} = useSelector((state:RootState)=>state.user);

    console.log("User data in NotificationsPage:", user);
    const {sendNotification}  = useSendNotification();

    const runTest = async (id: ChannelId) => {
        if (!channels[id].value.trim()) return;
        console.log("Sending test notification to", channels[id].value);
        console.log("Channel ID:", id);

        const dataResponse = await sendNotification({
            userId: user?.id || "",
            channel: id.toUpperCase() as "EMAIL" | "SMS" | "WEBHOOK",
            destination: channels[id].value,
            message: "This is a test notification from uptimeConsole.",
            subject: "Test Notification",
            title: "Test Notification",
            url: "https://uptimeconsole.com",
        });
        // updateChannel(id, { testStatus: "testing" });
        console.log(dataResponse);
    }

    // const runTest = (id: ChannelId) => {
    //     if (!channels[id].value.trim()) return;
    //     updateChannel(id, { testStatus: "testing" });
    //     // Simulated call — replace with a real Lambda invoke via API Gateway / AppSync
    //     setTimeout(() => {
    //         updateChannel(id, { testStatus: "sent" });
    //         setTimeout(() => updateChannel(id, { testStatus: "idle" }), 2000);
    //     }, 1200);
    // };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-6 py-10">
                <h1 className="text-4xl font-bold text-gray-900">Notifications</h1>
                <p className="mt-2 text-gray-500">
                    Choose how uptimeConsole should reach you when a project goes down.
                </p>

                <div className="mt-8 flex flex-col gap-4">
                    {CHANNELS.map((channel) => {
                        const state = channels[channel.id];
                        const Icon = channel.icon;

                        return (
                            <div
                                key={channel.id}
                                className={`rounded-lg border transition-colors ${state.enabled ? "border-gray-300 bg-white" : "border-gray-200 bg-gray-50"
                                    }`}
                            >
                                <div className="flex items-start justify-between p-5">
                                    <div className="flex gap-4">
                                        <div
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${state.enabled ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-400"
                                                }`}
                                        >
                                            <Icon size={18} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h2 className="font-semibold text-gray-900">{channel.title}</h2>
                                                <span className="text-xs text-gray-400 font-mono">{channel.service}</span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-0.5">{channel.description}</p>
                                        </div>
                                    </div>

                                    {/* Toggle */}
                                    <button
                                        onClick={() => toggleChannel(channel.id)}
                                        aria-pressed={state.enabled}
                                        aria-label={`Toggle ${channel.title} notifications`}
                                        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${state.enabled ? "bg-blue-300" : "bg-gray-300"
                                            }`}
                                    >
                                        <span
                                            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${!state.enabled ? "-translate-x-5" : "translate-x-0"
                                                }`}
                                        />
                                    </button>
                                </div>

                                {state.enabled && (
                                    <div className="flex items-center gap-3 border-t border-gray-100 px-5 py-4">
                                        <input
                                            type={channel.inputType}
                                            value={state.value}
                                            onChange={(e) => updateChannel(channel.id, { value: e.target.value })}
                                            placeholder={channel.placeholder}
                                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button
                                            onClick={() => runTest(channel.id)}
                                            disabled={!state.value.trim() || state.testStatus === "testing"}
                                            className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {state.testStatus === "testing" && <Loader2 size={14} className="animate-spin" />}
                                            {state.testStatus === "sent" && <Check size={14} className="text-green-600" />}
                                            {state.testStatus === "testing"
                                                ? "Sending..."
                                                : state.testStatus === "sent"
                                                    ? "Sent"
                                                    : "Send test"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 flex justify-end">
                    <button className="rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800">
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    );
}