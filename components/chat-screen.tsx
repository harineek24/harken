"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type React from "react";
import { useState } from "react";
import type { Mode, UserRole } from "./empathy-engine-app";

type ChatScreenProps = {
  userRole: UserRole;
  selectedMode: Mode | null;
  onBack: () => void;
  id?: string;
  initialChatModel?: string;
  session?: any;
};

// Move components outside to avoid nested component definitions
const PerspectiveCheckInterface = ({
  messages,
  currentPersona,
  setCurrentPersona,
  input,
  handleInputChange,
  handleKeyDown,
  handleFormSubmit,
  isLoading,
}: any) => (
  <div className="flex flex-1 flex-col">
    <div className="border-b bg-blue-50 p-4">
      <p className="text-blue-800 text-sm">
        <strong>How it works:</strong> Describe your idea, then choose which
        team perspective you want to hear from
      </p>
    </div>

    {/* Messages */}
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
      {messages.map((message: any) => (
        <div
          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          key={message.id}
        >
          <div
            className={`max-w-xs rounded-2xl px-4 py-3 lg:max-w-md ${
              message.role === "user"
                ? "bg-blue-600 text-white"
                : "border bg-white shadow-sm"
            }`}
          >
            {message.role === "assistant" && currentPersona && (
              <div className="mb-2 font-medium text-gray-600 text-sm">
                {currentPersona} perspective:
              </div>
            )}
            <div className="whitespace-pre-wrap">{message.content}</div>
          </div>
        </div>
      ))}
    </div>

    {/* Team selector */}
    {messages.length === 0 || !currentPersona ? (
      <div className="border-t bg-gray-50 p-4">
        <p className="mb-3 font-medium text-gray-700 text-sm">
          Get perspective from:
        </p>
        <div className="mb-4 grid grid-cols-2 gap-3">
          {[
            { id: "engineering", name: "Engineering", icon: "⚙️" },
            { id: "design", name: "Design", icon: "🎨" },
            { id: "sales", name: "Sales", icon: "💼" },
            { id: "support", name: "Support", icon: "🎧" },
          ].map((team) => (
            <button
              className="rounded-lg border border-gray-300 p-3 text-center transition-all hover:border-blue-400 hover:shadow-sm"
              key={team.id}
              onClick={() => setCurrentPersona(team.id)}
              type="button"
            >
              <div className="mb-1 text-xl">{team.icon}</div>
              <div className="font-medium text-gray-900">{team.name}</div>
            </button>
          ))}
        </div>
      </div>
    ) : null}

    {/* Input */}
    <div className="border-t p-4">
      <div className="flex space-x-3">
        <input
          className="flex-1 rounded-full border border-gray-300 p-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={
            currentPersona
              ? `Ask from ${currentPersona} perspective...`
              : "Describe your idea... (e.g., 'We want to add real-time collaboration')"
          }
          value={input}
        />
        <button
          className="rounded-full bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isLoading || !input.trim()}
          onClick={handleFormSubmit}
          type="button"
        >
          Send
        </button>
      </div>

      {currentPersona && (
        <button
          className="mt-2 text-gray-500 text-sm hover:text-gray-700"
          onClick={() => setCurrentPersona(null)}
          type="button"
        >
          ← Choose different perspective
        </button>
      )}
    </div>
  </div>
);

const TranslationInterface = ({
  messages,
  input,
  handleInputChange,
  handleFormSubmit,
  isLoading,
  fromRole,
  setFromRole,
  toRole,
  setToRole,
}: any) => (
  <div className="flex flex-1 flex-col p-4">
    <div className="mx-auto w-full max-w-2xl">
      {messages.length === 0 ? (
        <div className="space-y-4">
          <div>
            <label
              className="mb-2 block font-medium text-gray-700 text-sm"
              htmlFor="message-input"
            >
              Your message:
            </label>
            <textarea
              className="h-24 w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
              id="message-input"
              onChange={handleInputChange}
              placeholder="What do you want to say? (e.g., 'We need to ship this feature faster')"
              value={input}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="mb-2 block font-medium text-gray-700 text-sm"
                htmlFor="from-role"
              >
                From (your role):
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 p-3"
                id="from-role"
                onChange={(e) => setFromRole(e.target.value)}
                value={fromRole}
              >
                <option value="pm">Product Manager</option>
                <option value="engineering">Engineering</option>
                <option value="design">Design</option>
                <option value="sales">Sales</option>
                <option value="support">Support</option>
              </select>
            </div>

            <div>
              <label
                className="mb-2 block font-medium text-gray-700 text-sm"
                htmlFor="to-role"
              >
                To (target audience):
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 p-3"
                id="to-role"
                onChange={(e) => setToRole(e.target.value)}
                value={toRole}
              >
                <option value="engineering">Engineering</option>
                <option value="pm">Product Manager</option>
                <option value="design">Design</option>
                <option value="sales">Sales</option>
                <option value="support">Support</option>
              </select>
            </div>
          </div>

          <button
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            disabled={!input.trim() || isLoading}
            onClick={handleFormSubmit}
            type="button"
          >
            {isLoading ? "Translating..." : "Translate Message"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Show messages */}
          {messages.map((message: any) => (
            <div
              className={`rounded-lg border-l-4 p-4 ${
                message.role === "user"
                  ? "border-blue-400 bg-blue-50"
                  : "border-green-400 bg-green-50"
              }`}
              key={message.id}
            >
              <div className="mb-2 font-medium text-gray-600 text-sm">
                {message.role === "user"
                  ? `Original (${fromRole}):`
                  : `Translated for ${toRole}:`}
              </div>
              <div className="whitespace-pre-wrap">{message.content}</div>
            </div>
          ))}

          <button
            className="w-full rounded-lg bg-gray-600 py-2 font-medium text-white transition-colors hover:bg-gray-700"
            onClick={() => window.location.reload()}
            type="button"
          >
            Translate Another Message
          </button>
        </div>
      )}
    </div>
  </div>
);

const DefaultInterface = ({
  messages,
  isLoading,
  input,
  handleInputChange,
  handleKeyDown,
  handleFormSubmit,
  selectedMode,
}: any) => (
  <div className="flex flex-1 flex-col">
    {/* Messages */}
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
      {messages.map((message: any) => (
        <div
          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          key={message.id}
        >
          <div
            className={`max-w-xs rounded-2xl px-4 py-3 lg:max-w-md ${
              message.role === "user"
                ? "bg-blue-600 text-white"
                : "border bg-white shadow-sm"
            }`}
          >
            <div className="whitespace-pre-wrap">{message.content}</div>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="rounded-2xl border bg-white px-4 py-3 shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
              <span className="text-gray-600 text-sm">Thinking...</span>
            </div>
          </div>
        </div>
      )}
    </div>

    {/* Input */}
    <div className="border-t p-4">
      <div className="flex space-x-3">
        <input
          className="flex-1 rounded-full border border-gray-300 p-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={`Try: ${selectedMode?.example || "Ask me anything..."}`}
          value={input}
        />
        <button
          className="rounded-full bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isLoading || !input.trim()}
          onClick={handleFormSubmit}
          type="button"
        >
          Send
        </button>
      </div>
    </div>
  </div>
);

export function ChatScreen({
  userRole,
  selectedMode,
  onBack,
  id,
  initialChatModel,
}: ChatScreenProps) {
  const [currentPersona, setCurrentPersona] = useState<string | null>(null);
  const [fromRole, setFromRole] = useState<string>(userRole || "pm");
  const [toRole, setToRole] = useState<string>("engineering");
  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat({
    id,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest(request) {
        return {
          body: {
            ...request.body,
            mode: selectedMode?.id,
            userRole,
            persona: currentPersona,
            fromRole,
            toRole,
            model: initialChatModel,
          },
        };
      },
    }),
  });

  const isLoading = status === "submitted";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      return;
    }
    sendMessage({
      role: "user" as const,
      parts: [{ type: "text", text: input }],
    });
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleFormSubmit(e as any);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between bg-blue-600 p-4 text-white">
        <button
          className="flex items-center space-x-2 text-blue-100 hover:text-white"
          onClick={onBack}
          type="button"
        >
          <span>←</span>
          <span>Back</span>
        </button>
        <div className="text-center">
          <h3 className="font-medium">{selectedMode?.title}</h3>
          <p className="text-blue-100 text-sm">{selectedMode?.description}</p>
        </div>
        <div className="text-blue-100">{selectedMode?.icon}</div>
      </div>

      {/* Mode-specific interface */}
      {selectedMode?.id === "perspective-check" && (
        <PerspectiveCheckInterface
          currentPersona={currentPersona}
          handleFormSubmit={handleFormSubmit}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          input={input}
          isLoading={isLoading}
          messages={messages}
          setCurrentPersona={setCurrentPersona}
        />
      )}
      {selectedMode?.id === "translation" && (
        <TranslationInterface
          fromRole={fromRole}
          handleFormSubmit={handleFormSubmit}
          handleInputChange={handleInputChange}
          input={input}
          isLoading={isLoading}
          messages={messages}
          setFromRole={setFromRole}
          setToRole={setToRole}
          toRole={toRole}
        />
      )}
      {(selectedMode?.id === "conversation-practice" ||
        selectedMode?.id === "multi-perspective" ||
        selectedMode?.id === "tech-to-business" ||
        selectedMode?.id === "pm-perspective" ||
        selectedMode?.id === "stakeholder-communication" ||
        selectedMode?.id === "design-advocacy" ||
        selectedMode?.id === "pm-alignment" ||
        selectedMode?.id === "eng-collaboration" ||
        selectedMode?.id === "general-translation" ||
        selectedMode?.id === "team-dynamics") && (
        <DefaultInterface
          handleFormSubmit={handleFormSubmit}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          input={input}
          isLoading={isLoading}
          messages={messages}
          selectedMode={selectedMode}
        />
      )}
    </div>
  );
}
