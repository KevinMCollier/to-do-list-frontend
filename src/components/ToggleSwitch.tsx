type ToggleSwitchProps = {
  isToday: boolean;
  setTodayView: (value: boolean) => void;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isToday, setTodayView }) => {
  return (
    <div className="flex justify-center space-x-2 mb-4">
      <button
        className={`px-4 py-2 rounded-lg ${isToday ? 'bg-blue-500 text-white' : 'bg-transparent border border-gray-300'}`}
        onClick={() => setTodayView(false)}
      >
        My To Do List
      </button>
      <button
        className={`px-4 py-2 rounded-lg ${!isToday ? 'bg-blue-500 text-white' : 'bg-transparent border border-gray-300'}`}
        onClick={() => setTodayView(true)}
      >
        Today
      </button>
    </div>
  );
};

export default ToggleSwitch;
