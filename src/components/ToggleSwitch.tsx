type ToggleSwitchProps = {
  viewMode: 'all' | 'today' | 'week';
  setViewMode: (mode: 'all' | 'today' | 'week') => void;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex justify-center mb-4 border-b border-gray-300">
      <button
        className={`px-4 py-2 -mb-px font-medium text-sm ${viewMode === 'all' ? 'text-blue-500 border-blue-500 border-b-2' : 'text-gray-500 hover:text-blue-500'}`}
        onClick={() => setViewMode('all')}
      >
        All Tasks
      </button>
      <button
        className={`px-4 py-2 -mb-px font-medium text-sm ${viewMode === 'today' ? 'text-blue-500 border-blue-500 border-b-2' : 'text-gray-500 hover:text-blue-500'}`}
        onClick={() => setViewMode('today')}
      >
        Today
      </button>
      <button
        className={`px-4 py-2 -mb-px font-medium text-sm ${viewMode === 'week' ? 'text-blue-500 border-blue-500 border-b-2' : 'text-gray-500 hover:text-blue-500'}`}
        onClick={() => setViewMode('week')}
      >
        This Week
      </button>
    </div>
  );
};

export default ToggleSwitch;
