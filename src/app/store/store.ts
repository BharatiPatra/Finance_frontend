import { configureStore } from '@reduxjs/toolkit';
import netWorthReducer from './netWorthSlice';
import mutualFundsReducer from './mutualFundsSlice';
import epfReducer from './epfSlice';
import creditReportReducer from './creditReportSlice';

export const store = configureStore({
  reducer: {
    netWorth: netWorthReducer,
    mutualFunds: mutualFundsReducer,
    epf: epfReducer,
    creditReport: creditReportReducer
  }
});
