import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NotificationContainer from './NotificationContainer';
import { NotificationContext } from '../../context/NotificationContext';

const renderWithContext = (notifications, mockRemove) => {
    return render(
        <NotificationContext.Provider value={{ notifications, removeNotification: mockRemove }}>
            <NotificationContainer />
        </NotificationContext.Provider>
    );
};

describe('NotificationContainer', () => {
    it('does not render anything when there are no notifications', () => {
        const { container } = renderWithContext([], jest.fn());
        expect(container.firstChild).toBeNull();
    });

    it('renders a success notification', () => {
        const notes = [{ id: 1, msg: 'Saved successfully', isErr: false }];
        renderWithContext(notes, jest.fn());
        expect(screen.getByText('Saved successfully')).toBeInTheDocument();
        expect(screen.getByText('Saved successfully').closest('div')).toHaveClass('toast-success');
    });

    it('renders an error notification', () => {
        const notes = [{ id: 2, msg: 'Failed to save', isErr: true }];
        renderWithContext(notes, jest.fn());
        expect(screen.getByText('Failed to save')).toBeInTheDocument();
        expect(screen.getByText('Failed to save').closest('div')).toHaveClass('toast-error');
    });

    it('calls removeNotification when close button is clicked', () => {
        const mockRemove = jest.fn();
        const notes = [{ id: 1, msg: 'Test message', isErr: false }];
        renderWithContext(notes, mockRemove);
        
        const closeBtn = screen.getByText('×');
        fireEvent.click(closeBtn);
        expect(mockRemove).toHaveBeenCalledWith(1);
    });
});
