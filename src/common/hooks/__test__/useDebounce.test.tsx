import { useDebounce } from '../useDebounce';
import { render } from '@testing-library/react';
import { FC, useEffect } from 'react';

jest.useFakeTimers();

const TestComponent: FC<{ trigger: number, onUpdate: jest.Mock }> = ({ trigger, onUpdate }) => {
  const cancel = useDebounce(() => {
    onUpdate();
  }, 300, [trigger]);

  useEffect(() => {
    if (trigger === -1) {
      cancel();
    }
  }, [cancel, trigger]);

  return <div></div>;
};

describe('useDebounce', () => {
  it('should debounce calls if less than duration', () => {
    const handleUpdate = jest.fn();

    const { rerender } = render(<TestComponent trigger={0} onUpdate={handleUpdate}/>);
    rerender(<TestComponent trigger={1} onUpdate={handleUpdate}/>);

    jest.advanceTimersByTime(300);

    expect(handleUpdate).toHaveBeenCalledTimes(1);
  });

  it('should not debounce calls if greater than duration', () => {
    const handleUpdate = jest.fn();

    const { rerender } = render(<TestComponent trigger={0} onUpdate={handleUpdate}/>);
    jest.advanceTimersByTime(300);
    rerender(<TestComponent trigger={1} onUpdate={handleUpdate}/>);
    jest.advanceTimersByTime(300);

    expect(handleUpdate).toHaveBeenCalledTimes(2);
  });

  it('should cancel debounce', () => {
    const handleUpdate = jest.fn();

    const { rerender } = render(<TestComponent trigger={0} onUpdate={handleUpdate}/>);
    rerender(<TestComponent trigger={-1} onUpdate={handleUpdate}/>);
    jest.advanceTimersByTime(300);

    expect(handleUpdate).not.toHaveBeenCalled();
  });
});