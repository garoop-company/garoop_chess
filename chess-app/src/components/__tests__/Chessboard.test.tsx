import { render, screen } from '@testing-library/react';
import ChessboardComponent from '../Chessboard';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string, params: any) => {
    if (key === 'pieceOn') {
      return `${params.pieceName} on ${params.square}`;
    }
    return key;
  },
}));

describe('ChessboardComponent', () => {
  it('renders the chessboard', () => {
    render(<ChessboardComponent />);

    // react-chessboard uses a data-board-id attribute
    const chessboardElement = screen.getByTestId('Chessboard');
    expect(chessboardElement).toBeInTheDocument();
  });
});
