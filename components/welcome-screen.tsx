"use client";

import type { UserRole } from "./empathy-engine-app";

type WelcomeScreenProps = {
  onRoleSelect: (role: UserRole) => void;
};

export function WelcomeScreen({ onRoleSelect }: WelcomeScreenProps) {
  const roles = [
    {
      id: "pm" as const,
      icon: "📊",
      title: "Product Manager",
      description: "Understand team perspectives & practice conversations",
    },
    {
      id: "engineer" as const,
      icon: "⚙️",
      title: "Engineer",
      description: "Translate technical concerns to business language",
    },
    {
      id: "designer" as const,
      icon: "🎨",
      title: "Designer",
      description: "Communicate design decisions across teams",
    },
    {
      id: "other" as const,
      icon: "🤝",
      title: "Other Role",
      description: "Sales, Support, or exploring team dynamics",
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 font-bold text-3xl text-gray-900">
            Cross-Team Empathy Engine
          </h1>
          <p className="text-gray-600">
            Bridge communication gaps between teams
          </p>
        </div>

        <div className="space-y-4 rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-center font-semibold text-gray-800 text-lg">
            What&apos;s your role?
          </h2>

          <div className="space-y-3">
            {roles.map((role) => (
              <button
                className="w-full rounded-lg border border-gray-200 p-4 text-left transition-all hover:border-blue-300 hover:shadow-sm"
                key={role.id}
                onClick={() => onRoleSelect(role.id)}
                type="button"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{role.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900">
                      {role.title}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {role.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
