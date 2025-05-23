import ordersReducer, {
  setCurrentOrder,
  clearCurrentOrder,
  fetchOrders,
  fetchFeed,
  createOrder,
  fetchOrderByNumber,
  initialState
} from '../ordersSlice';
import { TOrder, TFeedsResponse } from '@utils-types';

const mockOrder: TOrder = {
  _id: '1',
  ingredients: ['643d69a5c3f7b9001cfa093c'],
  status: 'done',
  name: 'Space флюоресцентный бургер',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  number: 1
};

describe('ordersSlice', () => {
  it('should handle initial state', () => {
    expect(ordersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setCurrentOrder', () => {
    const actual = ordersReducer(initialState, setCurrentOrder(mockOrder));
    expect(actual.currentOrder).toEqual(mockOrder);
  });

  it('should handle clearCurrentOrder', () => {
    const stateWithOrder = {
      ...initialState,
      currentOrder: mockOrder
    };
    const actual = ordersReducer(stateWithOrder, clearCurrentOrder());
    expect(actual.currentOrder).toBeNull();
  });

  it('should handle fetchOrders.pending', () => {
    const action = { type: fetchOrders.pending.type };
    const actual = ordersReducer(initialState, action);
    expect(actual.loading).toBe(true);
    expect(actual.error).toBeNull();
  });

  it('should handle fetchOrders.fulfilled', () => {
    const orders = [mockOrder];
    const action = { type: fetchOrders.fulfilled.type, payload: orders };
    const actual = ordersReducer(initialState, action);
    expect(actual.loading).toBe(false);
    expect(actual.orders).toEqual(orders);
  });

  it('should handle fetchOrders.rejected', () => {
    const error = 'Error fetching orders';
    const action = { type: fetchOrders.rejected.type, error: { message: error } };
    const actual = ordersReducer(initialState, action);
    expect(actual.loading).toBe(false);
    expect(actual.error).toBe(error);
  });

  it('should handle fetchFeed.pending', () => {
    const action = { type: fetchFeed.pending.type };
    const actual = ordersReducer(initialState, action);
    expect(actual.loading).toBe(true);
    expect(actual.error).toBeNull();
  });

  it('should handle fetchFeed.fulfilled', () => {
    const feed = {
      orders: [
        {
          _id: '1',
          ingredients: ['1', '2'],
          status: 'done',
          name: 'Test Order',
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
          number: 1
        }
      ],
      total: 1,
      totalToday: 1,
      success: true
    };
    const action = fetchFeed.fulfilled(feed, 'requestId');
    const actual = ordersReducer(initialState, action);
    expect(actual.loading).toBe(false);
    expect(actual.feed).toEqual(feed);
  });

  it('should handle fetchFeed.rejected', () => {
    const error = 'Error fetching feed';
    const action = { type: fetchFeed.rejected.type, error: { message: error } };
    const actual = ordersReducer(initialState, action);
    expect(actual.loading).toBe(false);
    expect(actual.error).toBe(error);
  });

  it('should handle createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const actual = ordersReducer(initialState, action);
    expect(actual.loading).toBe(true);
    expect(actual.error).toBeNull();
  });

  it('should handle createOrder.fulfilled', () => {
    const action = { type: createOrder.fulfilled.type, payload: mockOrder };
    const actual = ordersReducer(initialState, action);
    expect(actual.loading).toBe(false);
    expect(actual.currentOrder).toEqual(mockOrder);
  });

  it('should handle createOrder.rejected', () => {
    const error = 'Error creating order';
    const action = { type: createOrder.rejected.type, error: { message: error } };
    const actual = ordersReducer(initialState, action);
    expect(actual.loading).toBe(false);
    expect(actual.error).toBe(error);
  });

  it('should handle fetchOrderByNumber.pending', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const actual = ordersReducer(initialState, action);
    expect(actual.loading).toBe(true);
    expect(actual.error).toBeNull();
  });

  it('should handle fetchOrderByNumber.fulfilled', () => {
    const action = { type: fetchOrderByNumber.fulfilled.type, payload: mockOrder };
    const actual = ordersReducer(initialState, action);
    expect(actual.loading).toBe(false);
    expect(actual.currentOrder).toEqual(mockOrder);
  });

  it('should handle fetchOrderByNumber.rejected', () => {
    const error = 'Error fetching order';
    const action = { type: fetchOrderByNumber.rejected.type, error: { message: error } };
    const actual = ordersReducer(initialState, action);
    expect(actual.loading).toBe(false);
    expect(actual.error).toBe(error);
  });
}); 