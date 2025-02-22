  import { configureStore, combineReducers } from '@reduxjs/toolkit';
  import { persistStore, persistReducer } from 'redux-persist';
  import storage from 'redux-persist/lib/storage';
  import courseReducer from './slices/courseSlice';
  import errorReducer from './slices/errorSlice';
  import topicReducer from './slices/topicSlice';
  import subjectReducer from "./slices/subjectSlice";
  import assessmentReducer from "./slices/assessmentSlice";


  // Combine all reducers
  const rootReducer = combineReducers({
    course: courseReducer,
    error: errorReducer,
    topic: topicReducer,
    subject: subjectReducer,
    assessment: assessmentReducer
  });

  // Configure persistence
  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['course','error','topic','subject','assessment'], // Persist only these slices
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  // Configure the store
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore non-serializable values from redux-persist actions
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }),
  });

  // Create the persistor
  export const persistor = persistStore(store);

  export default store;
