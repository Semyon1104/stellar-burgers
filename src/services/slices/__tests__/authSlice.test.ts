import authReducer, {
  setAuthChecked,
  login,
  register,
  logout,
  getUser,
  updateUser,
  forgotPassword,
  resetPassword,
  initialState
} from '../authSlice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  email: 'test@test.com',
  name: 'Test User'
};

describe('authSlice', () => {
  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setAuthChecked', () => {
    const actual = authReducer(initialState, setAuthChecked(true));
    expect(actual.isAuthChecked).toBe(true);
  });

  it('should handle login.pending', () => {
    const action = { type: login.pending.type };
    const actual = authReducer(initialState, action);
    expect(actual.loading).toBe(true);
    expect(actual.error).toBeNull();
  });

  it('should handle login.fulfilled', () => {
    const action = { type: login.fulfilled.type, payload: mockUser };
    const actual = authReducer(initialState, action);
    expect(actual.loading).toBe(false);
    expect(actual.user).toEqual(mockUser);
  });

  it('should handle login.rejected', () => {
    const error = 'Login failed';
    const action = { type: login.rejected.type, error: { message: error } };
    const actual = authReducer(initialState, action);
    expect(actual.loading).toBe(false);
    expect(actual.error).toBe(error);
  });

  it('should handle register.pending', () => {
    const action = { type: register.pending.type };
    const actual = authReducer(initialState, action);
    expect(actual.loading).toBe(true);
    expect(actual.error).toBeNull();
  });

  it('should handle register.fulfilled', () => {
    const action = { type: register.fulfilled.type, payload: mockUser };
    const actual = authReducer(initialState, action);
    expect(actual.loading).toBe(false);
    expect(actual.user).toEqual(mockUser);
  });

  it('should handle register.rejected', () => {
    const error = 'Registration failed';
    const action = { type: register.rejected.type, error: { message: error } };
    const actual = authReducer(initialState, action);
    expect(actual.loading).toBe(false);
    expect(actual.error).toBe(error);
  });

  it('should handle logout.fulfilled', () => {
    const stateWithUser = {
      ...initialState,
      user: mockUser
    };
    const action = { type: logout.fulfilled.type };
    const actual = authReducer(stateWithUser, action);
    expect(actual.user).toBeNull();
  });

  it('should handle getUser.fulfilled', () => {
    const action = { type: getUser.fulfilled.type, payload: mockUser };
    const actual = authReducer(initialState, action);
    expect(actual.user).toEqual(mockUser);
    expect(actual.isAuthChecked).toBe(true);
  });

  it('should handle getUser.rejected', () => {
    const action = { type: getUser.rejected.type };
    const actual = authReducer(initialState, action);
    expect(actual.isAuthChecked).toBe(true);
  });

  it('should handle updateUser.fulfilled', () => {
    const updatedUser = { ...mockUser, name: 'Updated User' };
    const action = { type: updateUser.fulfilled.type, payload: updatedUser };
    const actual = authReducer({ ...initialState, user: mockUser }, action);
    expect(actual.user).toEqual(updatedUser);
  });

  it('should handle forgotPassword.pending', () => {
    const action = { type: forgotPassword.pending.type };
    const actual = authReducer(initialState, action);
    expect(actual.loading).toBe(true);
    expect(actual.error).toBeNull();
  });

  it('should handle forgotPassword.fulfilled', () => {
    const action = { type: forgotPassword.fulfilled.type };
    const actual = authReducer(initialState, action);
    expect(actual.loading).toBe(false);
  });

  it('should handle forgotPassword.rejected', () => {
    const error = 'Ошибка восстановления пароля';
    const action = { type: forgotPassword.rejected.type, error: { message: error } };
    const actual = authReducer(initialState, action);
    expect(actual.loading).toBe(false);
    expect(actual.error).toBe(error);
  });

  it('should handle resetPassword.pending', () => {
    const action = { type: resetPassword.pending.type };
    const actual = authReducer(initialState, action);
    expect(actual.loading).toBe(true);
    expect(actual.error).toBeNull();
  });

  it('should handle resetPassword.fulfilled', () => {
    const action = { type: resetPassword.fulfilled.type };
    const actual = authReducer(initialState, action);
    expect(actual.loading).toBe(false);
  });

  it('should handle resetPassword.rejected', () => {
    const error = 'Ошибка сброса пароля';
    const action = { type: resetPassword.rejected.type, error: { message: error } };
    const actual = authReducer(initialState, action);
    expect(actual.loading).toBe(false);
    expect(actual.error).toBe(error);
  });
}); 