import { useNavigation } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa6';

const Spinner = () => {
  const navigation = useNavigation();

  return (
    <div
      className={`w-full h-full absolute flex justify-center items-center bg-zinc-200/50 dark:bg-zinc-600/50 ${navigation.state === 'loading' ? 'block' : 'hidden'}`}
      data-testid="spinner"
    >
      <FaSpinner className="text-blue-500 animate-spin" size={50}/>
    </div>
  );
}

export default Spinner;