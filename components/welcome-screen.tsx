'use client';

import React from 'react';
import type { UserRole } from './empathy-engine-app';

interface WelcomeScreenProps {
  onRoleSelect: (role: UserRole) => void;
}

export function WelcomeScreen({ onRoleSelect }: WelcomeScreenProps) {
  const roles = [
    {
      id: 'pm' as const,
      icon: '📊',
      title: 'Product Manager',
      description: 'Understand team perspectives & practice conversations'
    },
    {
      id: 'engineer' as const,
      icon: '⚙️',
      title: 'Engineer',
      description: 'Translate technical concerns to business language'
    },
    {
      id: 'designer' as const,
      icon: '🎨',
      title: 'Designer',
      description: 'Communicate design decisions across teams'
    },
    {
      id: 'other' as const,
      icon: '🤝',
      title: 'Other Role',
      description: 'Sales, Support, or exploring team dynamics'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cross-Team Empathy Engine
          </h1>
          <p className="text-gray-600">
            Bridge communication gaps between teams
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">
            What&apos;s your role?
          </h2>
          
          <div className="space-y-3">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => onRoleSelect(role.id)}
                className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{role.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900">{role.title}</div>
                    <div className="text-sm text-gray-600">{role.description}</div>
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