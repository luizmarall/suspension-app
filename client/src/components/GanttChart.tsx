import { CronogramaActivity } from "@shared/types";

interface GanttChartProps {
  activities: CronogramaActivity[];
}

export function GanttChart({ activities }: GanttChartProps) {
  // Parse date string (DD/MM) to day of year
  const getDatePosition = (dateStr: string): number => {
    const [day, month] = dateStr.split("/").map(Number);
    const date = new Date(2025, month - 1, day);
    const start = new Date(2025, 0, 1);
    const diff = Math.floor((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  };

  // Get color based on topic
  const getTopicColor = (topicId: number): string => {
    switch (topicId) {
      case 1:
        return "from-green-500 to-green-600";
      case 2:
        return "from-blue-500 to-blue-600";
      case 3:
        return "from-orange-500 to-orange-600";
      default:
        return "from-red-500 to-red-600";
    }
  };

  const getTopicLabel = (topicId: number): string => {
    switch (topicId) {
      case 1:
        return "Variável";
      case 2:
        return "Resultado";
      case 3:
        return "STACK";
      default:
        return "Outro";
    }
  };

  // Calculate positions and widths
  const maxDays = 60; // Total days in timeline
  const calculateBarStyle = (startDate: string, duration: number) => {
    const startPos = getDatePosition(startDate);
    const leftPercent = (startPos / maxDays) * 100;
    const widthPercent = (duration / maxDays) * 100;
    return {
      left: `${leftPercent}%`,
      width: `${widthPercent}%`,
    };
  };

  return (
    <div className="space-y-4">
      {/* Timeline Header */}
      <div className="flex items-center gap-4">
        <div className="w-48 font-semibold text-sm text-gray-700">Atividade</div>
        <div className="flex-1 relative h-8 bg-gray-100 rounded border border-gray-300">
          {/* Month markers */}
          <div className="absolute inset-0 flex">
            <div className="flex-1 border-r border-gray-300 flex items-center justify-center text-xs font-semibold text-gray-600">
              Janeiro
            </div>
            <div className="flex-1 border-r border-gray-300 flex items-center justify-center text-xs font-semibold text-gray-600">
              Fevereiro
            </div>
          </div>
        </div>
      </div>

      {/* Gantt Bars */}
      <div className="space-y-3">
        {activities?.map((activity) => {
          const barStyle = calculateBarStyle(activity.startDate, activity.durationDays);
          const topicColor = getTopicColor(activity.topicId);
          const topicLabel = getTopicLabel(activity.topicId);

          return (
            <div key={activity.id} className="flex items-center gap-4 group">
              {/* Activity Name */}
              <div className="w-48 text-sm font-medium text-gray-800 truncate" title={activity.activityName}>
                {activity.activityName}
              </div>

              {/* Timeline Container */}
              <div className="flex-1 relative h-10 bg-gray-50 rounded border border-gray-200 overflow-hidden">
                {/* Gantt Bar */}
                <div
                  className={`absolute top-1 bottom-1 bg-gradient-to-r ${topicColor} rounded shadow-md hover:shadow-lg transition-shadow cursor-pointer flex items-center justify-center text-white text-xs font-bold`}
                  style={barStyle}
                  title={`${activity.activityName} - ${activity.durationDays} dias`}
                >
                  {/* Show duration if bar is wide enough */}
                  {activity.durationDays > 10 && (
                    <span className="truncate px-2">{activity.durationDays}d</span>
                  )}
                </div>
              </div>

              {/* Duration Badge */}
              <div className="w-16 text-right">
                <span className="inline-block px-2 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded">
                  {activity.durationDays}d
                </span>
              </div>

              {/* Topic Badge */}
              <div className="w-20">
                <span className={`inline-block px-2 py-1 bg-gradient-to-r ${topicColor} text-white text-xs font-semibold rounded`}>
                  {topicLabel}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-600 rounded"></div>
          <span className="text-sm text-gray-600">Tópico 1: Variável</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded"></div>
          <span className="text-sm text-gray-600">Tópico 2: Resultado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded"></div>
          <span className="text-sm text-gray-600">Tópico 3: STACK</span>
        </div>
      </div>
    </div>
  );
}

