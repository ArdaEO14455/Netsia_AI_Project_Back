

import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import { getAIResponse } from './AiRoutes';

// Mocking fetch, jwt. and aiRoutes functions
jest.mock('node-fetch');
jest.mock('jsonwebtoken');
jest.mock('./AiRoutes', () => ({
  ...jest.requireActual('./AiRoutes'), // Use real implementations of other functions
  aiResponse: jest.fn(), // Mock 'aiResponse' if it's a function
}));


