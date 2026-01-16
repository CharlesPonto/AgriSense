'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/ai-diagnosis-from-scan.ts';
import '@/ai/flows/yield-forecast-based-on-data.ts';
import '@/ai/flows/ai-diagnosis-includes-reasoning.ts';
import '@/ai/flows/treatment-recommendations-for-diagnosis.ts';
import '@/ai/flows/predict-crop-risk.ts';
