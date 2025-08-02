// __tests__/App.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Todoアプリ', () => {
  it('タスクを追加するとリストに表示される', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('タスクを入力');
    const button = screen.getByRole('button', { name: '追加' });

    fireEvent.change(input, { target: { value: '牛乳を買う' } });
    fireEvent.click(button);

    expect(screen.getByText('牛乳を買う')).toBeInTheDocument();
  });
});
