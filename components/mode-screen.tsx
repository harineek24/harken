import type { Mode, UserRole } from "./empathy-engine-app";

type ModeScreenProps = {
  userRole: UserRole;
  onModeSelect: (mode: Mode) => void;
  onBack: () => void;
};

export function ModeScreen({
  userRole,
  onModeSelect,
  onBack,
}: ModeScreenProps) {
  const getModes = (): Mode[] => {
    if (userRole === "pm") {
      return [
        {
          id: "perspective-check",
          icon: "👁️",
          title: "Perspective Check",
          description:
            "See how Engineering, Design, Sales, or Support would react to your idea",
          example:
            '"We want to add real-time collaboration" → How would Engineering respond?',
        },
        {
          id: "conversation-practice",
          icon: "🎭",
          title: "Conversation Practice",
          description:
            "Practice difficult conversations with team personas before the real thing",
          example:
            "Practice telling Engineering the timeline just got cut in half",
        },
        {
          id: "multi-perspective",
          icon: "🔄",
          title: "Multi-Perspective Analysis",
          description: "Get all team perspectives on a decision simultaneously",
          example:
            "How would each team approach solving this customer complaint?",
        },
        {
          id: "translation",
          icon: "🔤",
          title: "Message Translation",
          description: "Convert your message into another team's language",
          example: 'Translate "we need to ship faster" for Engineering',
        },
      ];
    }
    if (userRole === "engineer") {
      return [
        {
          id: "tech-to-business",
          icon: "📈",
          title: "Tech to Business Translation",
          description: "Explain technical concerns in business language",
          example: 'Translate "technical debt" into language PMs understand',
        },
        {
          id: "pm-perspective",
          icon: "📊",
          title: "Understand PM Pressure",
          description: "See why PMs make certain requests and how to respond",
          example: "Why does PM keep asking about timelines?",
        },
        {
          id: "stakeholder-communication",
          icon: "💬",
          title: "Stakeholder Communication",
          description:
            "Practice explaining technical trade-offs to non-technical stakeholders",
          example:
            'Explain why the "simple" feature request will take 3 months',
        },
      ];
    }
    if (userRole === "designer") {
      return [
        {
          id: "design-advocacy",
          icon: "🎨",
          title: "Design Advocacy",
          description:
            "Communicate design decisions and user needs effectively",
          example: "Explain why UX research is critical for this feature",
        },
        {
          id: "pm-alignment",
          icon: "🎯",
          title: "PM Alignment",
          description: "Understand business constraints and find middle ground",
          example: "Balance user needs with business timeline pressure",
        },
        {
          id: "eng-collaboration",
          icon: "⚙️",
          title: "Engineering Collaboration",
          description: "Bridge design vision with technical constraints",
          example: "Discuss design system changes with Engineering",
        },
      ];
    }
    return [
      {
        id: "general-translation",
        icon: "🔄",
        title: "Cross-Team Translation",
        description: "Translate between any team languages",
        example: "Convert Sales feedback into Engineering requirements",
      },
      {
        id: "team-dynamics",
        icon: "🤝",
        title: "Team Dynamics Explorer",
        description: "Understand different team motivations and concerns",
        example: "Why do teams seem to conflict on this project?",
      },
    ];
  };

  const getRoleDisplayName = (role: UserRole): string => {
    const names = {
      pm: "Product Manager",
      engineer: "Engineer",
      designer: "Designer",
      other: "Other",
    };
    return names[role || "other"] || "Other";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <button
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            onClick={onBack}
            type="button"
          >
            <span>←</span>
            <span>Back</span>
          </button>
          <div className="text-center">
            <h2 className="font-semibold text-gray-900 text-xl">
              Choose Your Mode
            </h2>
            <p className="text-gray-600 text-sm">
              Role: {getRoleDisplayName(userRole)}
            </p>
          </div>
          <div />
        </div>

        <div className="space-y-4">
          {getModes().map((mode) => (
            <button
              className="w-full rounded-xl border border-gray-200 bg-white p-6 text-left transition-all hover:border-blue-300 hover:shadow-md"
              key={mode.id}
              onClick={() => onModeSelect(mode)}
              type="button"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 text-3xl">{mode.icon}</div>
                <div className="flex-1">
                  <h3 className="mb-2 font-semibold text-gray-900">
                    {mode.title}
                  </h3>
                  <p className="mb-3 text-gray-600">{mode.description}</p>
                  <p className="text-blue-600 text-sm italic">{mode.example}</p>
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
