import { useState } from "react";
import { ChatScreen } from "./chat-screen";
import { ModeScreen } from "./mode-screen";
import { WelcomeScreen } from "./welcome-screen";

export type UserRole = "pm" | "engineer" | "designer" | "other" | null;
export type AppScreen = "welcome" | "modes" | "chat";

export type Mode = {
  id: string;
  icon: string;
  title: string;
  description: string;
  example: string;
};

type EmpathyEngineAppProps = {
  id?: string;
  initialChatModel?: string;
  session?: any; // Session from auth
};

export function EmpathyEngineApp({
  id,
  initialChatModel,
  session,
}: EmpathyEngineAppProps) {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("welcome");
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setCurrentScreen("modes");
  };

  const handleModeSelect = (mode: Mode) => {
    setSelectedMode(mode);
    setCurrentScreen("chat");
  };

  const handleBack = (screen: AppScreen) => {
    setCurrentScreen(screen);
  };

  return (
    <>
      {currentScreen === "welcome" && (
        <WelcomeScreen onRoleSelect={handleRoleSelect} />
      )}
      {currentScreen === "modes" && (
        <ModeScreen
          onBack={() => handleBack("welcome")}
          onModeSelect={handleModeSelect}
          userRole={userRole}
        />
      )}
      {currentScreen === "chat" && (
        <ChatScreen
          id={id}
          initialChatModel={initialChatModel}
          onBack={() => handleBack("modes")}
          selectedMode={selectedMode}
          session={session}
          userRole={userRole}
        />
      )}
    </>
  );
}
