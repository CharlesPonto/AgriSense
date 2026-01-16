'use server';
/**
 * @fileOverview A flow for forecasting crop yield based on current data and historical trends.
 *
 * - forecastYield - A function that handles the yield forecasting process.
 * - ForecastYieldInput - The input type for the forecastYield function.
 * - ForecastYieldOutput - The return type for the forecastYield function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ForecastYieldInputSchema = z.object({
  cropType: z.string().describe('The type of crop to forecast yield for.'),
  currentData: z
    .string()
    .describe(
      'Current data for the crop, including planting date, soil conditions, weather data, and any other relevant information.'
    ),
  historicalData: z
    .string()
    .describe(
      'Historical yield data for the crop, including past yields, growing conditions, and any other relevant historical information.'
    ),
});
export type ForecastYieldInput = z.infer<typeof ForecastYieldInputSchema>;

const ForecastYieldOutputSchema = z.object({
  predictedYield: z
    .string()
    .describe('The predicted yield for the crop, based on the current and historical data.'),
  confidenceInterval: z
    .string()
    .describe('A confidence interval for the predicted yield, indicating the range of possible yields.'),
  expectedLosses: z
    .string()
    .describe('Expected losses based on current conditions, weather, soil, and disease data.'),
  factorsInfluencingYield: z
    .string()
    .describe(
      'A list of factors that are influencing the yield, such as weather conditions, soil conditions, and pest pressure.'
    ),
  recommendations: z
    .string()
    .describe(
      'Recommendations for improving the yield, based on the factors that are influencing the yield.'
    ),
});
export type ForecastYieldOutput = z.infer<typeof ForecastYieldOutputSchema>;

export async function forecastYield(input: ForecastYieldInput): Promise<ForecastYieldOutput> {
  return forecastYieldFlow(input);
}

const prompt = ai.definePrompt({
  name: 'forecastYieldPrompt',
  input: {schema: ForecastYieldInputSchema},
  output: {schema: ForecastYieldOutputSchema},
  prompt: `You are an expert agricultural consultant specializing in crop yield forecasting for farms in the Davao region.

You will use current and historical data to predict the yield for a given crop. Provide a confidence interval, identify key influencing factors, estimate potential losses based on risks, and offer recommendations for improvement.

Crop Type: {{{cropType}}}
Current Data: {{{currentData}}}
Historical Data: {{{historicalData}}}

Based on this information, provide the predicted yield, a confidence interval, expected losses, factors influencing the yield, and recommendations for improving the yield.`,
});

const forecastYieldFlow = ai.defineFlow(
  {
    name: 'forecastYieldFlow',
    inputSchema: ForecastYieldInputSchema,
    outputSchema: ForecastYieldOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
