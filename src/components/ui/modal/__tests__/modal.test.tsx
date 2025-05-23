import { render, screen, fireEvent, setupModalRoot, cleanupModalRoot } from '../../../../utils/test-utils';
import { ModalUI } from '../modal';

describe('ModalUI', () => {
  const mockOnClose = jest.fn();
  const mockTitle = 'Test Modal';
  const mockChildren = <div>Test Content</div>;

  beforeEach(() => {
    jest.clearAllMocks();
    setupModalRoot();
  });

  afterEach(() => {
    cleanupModalRoot();
  });

  it('renders modal with title and content', () => {
    render(
      <ModalUI title={mockTitle} onClose={mockOnClose}>
        {mockChildren}
      </ModalUI>
    );

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <ModalUI title={mockTitle} onClose={mockOnClose}>
        {mockChildren}
      </ModalUI>
    );

    const closeButton = screen.getByTestId('modal-close');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', () => {
    render(
      <ModalUI title={mockTitle} onClose={mockOnClose}>
        {mockChildren}
      </ModalUI>
    );

    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when modal content is clicked', () => {
    render(
      <ModalUI title={mockTitle} onClose={mockOnClose}>
        {mockChildren}
      </ModalUI>
    );

    const modalContent = screen.getByText('Test Content');
    fireEvent.click(modalContent);

    expect(mockOnClose).not.toHaveBeenCalled();
  });
}); 