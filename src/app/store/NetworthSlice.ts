import { createSlice } from '@reduxjs/toolkit';

const initialState = { assets: [], liabilities: [], totalNetWorthValue: {} };

const netWorthSlice = createSlice({
  name: 'netWorth',
  initialState,
  reducers: {
    setNetWorthData(state, action) {
      state.assets = action.payload.assetValues;
      state.liabilities = action.payload.liabilityValues;
      state.totalNetWorthValue = action.payload.totalNetWorthValue;
    }
  }
});
export const { setNetWorthData } = netWorthSlice.actions;
export default netWorthSlice.reducer;
