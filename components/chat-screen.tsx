import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import type { UserRole, Mode } from './empathy-engine-app';
import type { ChatMessage } from '@/lib/types';
import { generateUUID } from '@/lib/utils';

interface ChatScreenProps {
  userRole: UserRole;
  selectedMode: Mode | null;
  onBack: () => void;
  id?: string;
  initialChatModel?: string;
  session?: any;
}

export function ChatScreen({ 
  userRole, 
  selectedMode, 
  onBack,
  id,
  initialChatModel,
  session 
}: ChatScreenProps) {
  const [currentPersona, setCurrentPersona] = useState<string | null>(null);
  const [fromRole, setFromRole] = useState<string>(userRole || 'pm');
  const [toRole, setToRole] = useState<string>('engineering');

  // Keep refs for values that might change but need to be captured in transport
  const currentModelRef = useRef(initialChatModel || 'chat-model');
  const modeRef = useRef(selectedMode?.id);
  const userRoleRef = useRef(userRole);
  const personaRef = useRef(currentPersona);
  const fromRoleRef = useRef(fromRole);
  const toRoleRef = useRef(toRole);

  useEffect(() => {
    modeRef.current = selectedMode?.id;
    userRoleRef.current = userRole;
    personaRef.current = currentPersona;
    fromRoleRef.current = fromRole;
    toRoleRef.current = toRole;
  }, [selectedMode?.id, userRole, currentPersona, fromRole, toRole]);

  const { messages, input, handleInputChange, handleSubmit, isLoading, sendMessage } = useChat<ChatMessage>({
    id,
    generateId: generateUUID,
    transport: new DefaultChatTransport({
      api: '/api/chat',
      prepareSendMessagesRequest(request: any) {
        return {
          body: {
            id: request.id,
            message: request.messages.at(-1),
            selectedChatModel: currentModelRef.current,
            selectedVisibilityType: 'private',
            mode: modeRef.current,
            userRole: userRoleRef.current,
            persona: personaRef.current,
            fromRole: fromRoleRef.current,
            toRole: toRoleRef.current,
            ...request.body,
          },
        };
      },
    }),
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleSubmit(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleFormSubmit(e as any);
    }
  };

  // Mode-specific interfaces
  const PerspectiveCheckInterface = () => (
    <div className="flex-1 flex flex-col">
      <div className="p-4 bg-blue-50 border-b">
        <p className="text-sm text-blue-800">
          <strong>How it works:</strong> Describe your idea, then choose which team perspective you want to hear from
        </p>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message: any) => {
          const textContent = message.parts
            ?.filter((part: any) => part.type === 'text')
            .map((part: any) => part.text)
            .join('') || '';
          
          return (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white shadow-sm border'
                }`}
              >
                {message.role === 'assistant' && currentPersona && (
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    {currentPersona} perspective:
                  </div>
                )}
                <div className="whitespace-pre-wrap">{textContent}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Team selector */}
      {messages.length === 0 || !currentPersona ? (
        <div className="p-4 bg-gray-50 border-t">
          <p className="text-sm font-medium text-gray-700 mb-3">Get perspective from:</p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { id: 'engineering', name: 'Engineering', icon: '⚙️' },
              { id: 'design', name: 'Design', icon: '🎨' },
              { id: 'sales', name: 'Sales', icon: '💼' },
              { id: 'support', name: 'Support', icon: '🎧' }
            ].map((team) => (
              <button 
                key={team.id}
                onClick={() => setCurrentPersona(team.id)}
                className="p-3 border border-gray-300 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all text-center"
              >
                <div className="text-xl mb-1">{team.icon}</div>
                <div className="font-medium text-gray-900">{team.name}</div>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex space-x-3">
          <input
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={
              currentPersona 
                ? `Ask from ${currentPersona} perspective...`
                : "Describe your idea... (e.g., 'We want to add real-time collaboration')"
            }
            className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleFormSubmit}
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Send
          </button>
        </div>
        
        {currentPersona && (
          <button
            onClick={() => setCurrentPersona(null)}
            className="mt-2 text-sm text-gray-500 hover:text-gray-700"
          >
            ← Choose different perspective
          </button>
        )}
      </div>
    </div>
  );

  const TranslationInterface = () => (
    <div className="flex-1 flex flex-col p-4">
      <div className="max-w-2xl mx-auto w-full">
        {messages.length === 0 ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your message:</label>
              <textarea
                value={input}
                onChange={(e: any) => handleInputChange({ target: { value: e.target.value } } as any)}
                placeholder="What do you want to say? (e.g., 'We need to ship this feature faster')"
                className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From (your role):</label>
                <select 
                  value={fromRole}
                  onChange={(e: any) => setFromRole(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="pm">Product Manager</option>
                  <option value="engineering">Engineering</option>
                  <option value="design">Design</option>
                  <option value="sales">Sales</option>
                  <option value="support">Support</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To (target audience):</label>
                <select 
                  value={toRole}
                  onChange={(e: any) => setToRole(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
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
              onClick={handleFormSubmit}
              disabled={!input.trim() || isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Translating...' : 'Translate Message'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Show messages */}
            {messages.map((message: any) => {
              const textContent = message.parts
                ?.filter((part: any) => part.type === 'text')
                .map((part: any) => part.text)
                .join('') || '';
              
              return (
                <div
                  key={message.id}
                  className={`p-4 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-blue-50 border-l-4 border-blue-400' 
                      : 'bg-green-50 border-l-4 border-green-400'
                  }`}
                >
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    {message.role === 'user' 
                      ? `Original (${fromRole}):`
                      : `Translated for ${toRole}:`
                    }
                  </div>
                  <div className="whitespace-pre-wrap">{textContent}</div>
                </div>
              );
            })}
            
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gray-600 text-white py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Translate Another Message
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const DefaultInterface = () => (
    <div className="flex-1 flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message: any) => {
          const textContent = message.parts
            ?.filter((part: any) => part.type === 'text')
            .map((part: any) => part.text)
            .join('') || '';
          
          return (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white shadow-sm border'
                }`}
              >
                <div className="whitespace-pre-wrap">{textContent}</div>
              </div>
            </div>
          );
        })}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm text-gray-600">Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex space-x-3">
          <input
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={`Try: ${selectedMode?.example || 'Ask me anything...'}`}
            className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleFormSubmit}
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="text-blue-100 hover:text-white flex items-center space-x-2"
        >
          <span>←</span>
          <span>Back</span>
        </button>
        <div className="text-center">
          <h3 className="font-medium">{selectedMode?.title}</h3>
          <p className="text-sm text-blue-100">{selectedMode?.description}</p>
        </div>
        <div className="text-blue-100">{selectedMode?.icon}</div>
      </div>

      {/* Mode-specific interface */}
      {selectedMode?.id === 'perspective-check' && <PerspectiveCheckInterface />}
      {selectedMode?.id === 'translation' && <TranslationInterface />}
      {(selectedMode?.id === 'conversation-practice' || 
        selectedMode?.id === 'multi-perspective' || 
        selectedMode?.id === 'tech-to-business' ||
        selectedMode?.id === 'pm-perspective' ||
        selectedMode?.id === 'stakeholder-communication' ||
        selectedMode?.id === 'design-advocacy' ||
        selectedMode?.id === 'pm-alignment' ||
        selectedMode?.id === 'eng-collaboration' ||
        selectedMode?.id === 'general-translation' ||
        selectedMode?.id === 'team-dynamics') && <DefaultInterface />}
    </div>
  );
}