type ToggleSwitchProps = {
  isToday: boolean;
  setTodayView: (value: boolean) => void;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isToday, setTodayView }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        className={`px-4 py-2 ${isToday ? 'bg-gray-300' : 'bg-transparent'}`}
        onClick={() => setTodayView(false)}
      >
        My To Do List
      </button>
      <button
        className={`px-4 py-2 ${!isToday ? 'bg-gray-300' : 'bg-transparent'}`}
        onClick={() => setTodayView(true)}
      >
        Today
      </button>
    </div>
  );
};

export default ToggleSwitch;
