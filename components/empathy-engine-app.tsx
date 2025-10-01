'use client';

import React, { useState } from 'react';
import { WelcomeScreen } from './welcome-screen';
import { ModeScreen } from './mode-screen';
import { ChatScreen } from './chat-screen';

export type UserRole = 'pm' | 'engineer' | 'designer' | 'other' | null;
export type AppScreen = 'welcome' | 'modes' | 'chat';

export interface Mode {
  id: string;
  icon: string;
  title: string;
  description: string;
  example: string;
}

interface EmpathyEngineAppProps {
  id?: string;
  initialChatModel?: string;
  session?: any;
}

export function EmpathyEngineApp({ id, initialChatModel, session }: EmpathyEngineAppProps) {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('welcome');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setCurrentScreen('modes');
  };

  const handleModeSelect = (mode: Mode) => {
    setSelectedMode(mode);
    setCurrentScreen('chat');
  };

  const handleBack = (screen: AppScreen) => {
    setCurrentScreen(screen);
  };

  return (
    <>
      {currentScreen === 'welcome' && (
        <WelcomeScreen onRoleSelect={handleRoleSelect} />
      )}
      {currentScreen === 'modes' && (
        <ModeScreen 
          userRole={userRole}
          onModeSelect={handleModeSelect}
          onBack={() => handleBack('welcome')}
        />
      )}
      {currentScreen === 'chat' && (
        <ChatScreen 
          id={id}
          userRole={userRole}
          selectedMode={selectedMode}
          initialChatModel={initialChatModel}
          session={session}
          onBack={() => handleBack('modes')}
        />
      )}
    </>
  );
}