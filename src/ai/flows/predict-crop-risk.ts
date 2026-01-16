'use server';
/**
 * @fileOverview An AI agent that predicts crop risks based on weather data.
 *
 * - predictCropRisk - A function that handles the crop risk prediction process.
 * - PredictCropRiskInput - The input type for the predictCropRisk function.
 * - PredictCropRiskOutput - The return type for the predictCropRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictCropRiskInputSchema = z.object({
  cropType: z.string().describe('The type of crop being analyzed.'),
  region: z.string().describe('The geographical region of the crop.'),
  weatherData: z.string().describe('The current and forecasted weather data (e.g., temperature, humidity, rainfall).'),
});
export type PredictCropRiskInput = z.infer<typeof PredictCropRiskInputSchema>;

const PredictCropRiskOutputSchema = z.object({
  riskLevel: z.string().describe('The predicted risk level (e.g., Low, Medium, High, Critical).'),
  riskDescription: z.string().describe('A description of the predicted risk, including the type of threat (e.g., fungal, pest, climate).'),
  recommendations: z.string().describe('Actionable recommendations to mitigate the predicted risk.'),
});
export type PredictCropRiskOutput = z.infer<typeof PredictCropRiskOutputSchema>;

export async function predictCropRisk(input: PredictCropRiskInput): Promise<PredictCropRiskOutput> {
  return predictCropRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictCropRiskPrompt',
  input: {schema: PredictCropRiskInputSchema},
  output: {schema: PredictCropRiskOutputSchema},
  prompt: `You are an agricultural risk assessment AI. Analyze the provided weather data for a specific crop and region to predict potential threats.

  Your prediction should include a risk level, a detailed description of the threat (e.g., fungal disease, pest infestation, heat stress), and a set of clear, actionable recommendations for the farmer or admin to mitigate this risk.

  Crop: {{{cropType}}}
  Region: {{{region}}}
  Weather Data: {{{weatherData}}}

  Based on this, provide your risk assessment.`,
});

const predictCropRiskFlow = ai.defineFlow(
  {
    name: 'predictCropRiskFlow',
    inputSchema: PredictCropRiskInputSchema,
    outputSchema: PredictCropRiskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
