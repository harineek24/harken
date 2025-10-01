import React from 'react';
import type { UserRole, Mode } from './empathy-engine-app';

interface ModeScreenProps {
  userRole: UserRole;
  onModeSelect: (mode: Mode) => void;
  onBack: () => void;
}

export function ModeScreen({ userRole, onModeSelect, onBack }: ModeScreenProps) {
  const getModes = (): Mode[] => {
    if (userRole === 'pm') {
      return [
        {
          id: 'perspective-check',
          icon: '👁️',
          title: 'Perspective Check',
          description: 'See how Engineering, Design, Sales, or Support would react to your idea',
          example: '"We want to add real-time collaboration" → How would Engineering respond?'
        },
        {
          id: 'conversation-practice', 
          icon: '🎭',
          title: 'Conversation Practice',
          description: 'Practice difficult conversations with team personas before the real thing',
          example: 'Practice telling Engineering the timeline just got cut in half'
        },
        {
          id: 'multi-perspective',
          icon: '🔄',
          title: 'Multi-Perspective Analysis', 
          description: 'Get all team perspectives on a decision simultaneously',
          example: 'How would each team approach solving this customer complaint?'
        },
        {
          id: 'translation',
          icon: '🔤',
          title: 'Message Translation',
          description: 'Convert your message into another team\'s language',
          example: 'Translate "we need to ship faster" for Engineering'
        }
      ];
    } else if (userRole === 'engineer') {
      return [
        {
          id: 'tech-to-business',
          icon: '📈', 
          title: 'Tech to Business Translation',
          description: 'Explain technical concerns in business language',
          example: 'Translate "technical debt" into language PMs understand'
        },
        {
          id: 'pm-perspective',
          icon: '📊',
          title: 'Understand PM Pressure', 
          description: 'See why PMs make certain requests and how to respond',
          example: 'Why does PM keep asking about timelines?'
        },
        {
          id: 'stakeholder-communication',
          icon: '💬',
          title: 'Stakeholder Communication',
          description: 'Practice explaining technical trade-offs to non-technical stakeholders',
          example: 'Explain why the "simple" feature request will take 3 months'
        }
      ];
    } else if (userRole === 'designer') {
      return [
        {
          id: 'design-advocacy',
          icon: '🎨',
          title: 'Design Advocacy',
          description: 'Communicate design decisions and user needs effectively',
          example: 'Explain why UX research is critical for this feature'
        },
        {
          id: 'pm-alignment', 
          icon: '🎯',
          title: 'PM Alignment',
          description: 'Understand business constraints and find middle ground',
          example: 'Balance user needs with business timeline pressure'
        },
        {
          id: 'eng-collaboration',
          icon: '⚙️',
          title: 'Engineering Collaboration', 
          description: 'Bridge design vision with technical constraints',
          example: 'Discuss design system changes with Engineering'
        }
      ];
    } else {
      return [
        {
          id: 'general-translation',
          icon: '🔄',
          title: 'Cross-Team Translation',
          description: 'Translate between any team languages',
          example: 'Convert Sales feedback into Engineering requirements'
        },
        {
          id: 'team-dynamics',
          icon: '🤝', 
          title: 'Team Dynamics Explorer',
          description: 'Understand different team motivations and concerns',
          example: 'Why do teams seem to conflict on this project?'
        }
      ];
    }
  };

  const getRoleDisplayName = (role: UserRole): string => {
    const names = {
      pm: 'Product Manager',
      engineer: 'Engineer', 
      designer: 'Designer',
      other: 'Other'
    };
    return names[role || 'other'] || 'Other';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 flex items-center space-x-2"
          >
            <span>←</span>
            <span>Back</span>
          </button>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">Choose Your Mode</h2>
            <p className="text-sm text-gray-600">Role: {getRoleDisplayName(userRole)}</p>
          </div>
          <div></div>
        </div>

        <div className="space-y-4">
          {getModes().map((mode) => (
            <button
              key={mode.id}
              onClick={() => onModeSelect(mode)}
              className="w-full p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-left"
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl flex-shrink-0">{mode.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{mode.title}</h3>
                  <p className="text-gray-600 mb-3">{mode.description}</p>
                  <p className="text-sm text-blue-600 italic">{mode.example}</p>
                </div>
                <div className="text-gray-400">→</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}