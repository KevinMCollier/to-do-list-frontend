type ToggleSwitchProps = {
  isToday: boolean;
  setTodayView: (value: boolean) => void;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isToday, setTodayView }) => {
  return (
    <div className="flex justify-center mb-4 border-b border-gray-300">
      <button
        className={`px-4 py-2 -mb-px font-medium text-sm ${isToday ? 'text-gray-500 hover:text-blue-500' : 'text-blue-500 border-blue-500 border-b-2'}`}
        onClick={() => setTodayView(false)}
      >
        All Tasks
      </button>
      <button
        className={`px-4 py-2 -mb-px font-medium text-sm ${!isToday ? 'text-gray-500 hover:text-blue-500' : 'text-blue-500 border-blue-500 border-b-2'}`}
        onClick={() => setTodayView(true)}
      >
        Today's Tasks
      </button>
    </div>
  );
};


export default ToggleSwitch;
