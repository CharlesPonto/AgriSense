'use server';
/**
 * @fileOverview AI-powered treatment recommendations for crop diagnoses.
 *
 * - getTreatmentRecommendations - A function that generates treatment recommendations based on a crop diagnosis.
 * - TreatmentRecommendationsInput - The input type for the getTreatmentRecommendations function.
 * - TreatmentRecommendationsOutput - The return type for the getTreatmentRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TreatmentRecommendationsInputSchema = z.object({
  diagnosis: z.string().describe('The AI diagnosis of the crop issue.'),
  cropType: z.string().describe('The type of crop affected.'),
  environmentalConditions: z.string().describe('The current environmental conditions (e.g., temperature, humidity).'),
});
export type TreatmentRecommendationsInput = z.infer<typeof TreatmentRecommendationsInputSchema>;

const TreatmentRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of treatment recommendations for the diagnosed crop issue.'),
  reasoning: z.string().describe('Explanation of why those treatments were recommended.'),
});
export type TreatmentRecommendationsOutput = z.infer<typeof TreatmentRecommendationsOutputSchema>;

export async function getTreatmentRecommendations(input: TreatmentRecommendationsInput): Promise<TreatmentRecommendationsOutput> {
  return treatmentRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'treatmentRecommendationsPrompt',
  input: {schema: TreatmentRecommendationsInputSchema},
  output: {schema: TreatmentRecommendationsOutputSchema},
  prompt: `You are an expert agricultural advisor. Based on the AI diagnosis, crop type, and environmental conditions, provide a list of specific treatment recommendations to resolve the crop issue. Explain the reasoning behind each recommendation.

AI Diagnosis: {{{diagnosis}}}
Crop Type: {{{cropType}}}
Environmental Conditions: {{{environmentalConditions}}}

Provide the recommendations as a numbered list, followed by a detailed explanation of why each treatment is recommended.`,,
});

const treatmentRecommendationsFlow = ai.defineFlow(
  {
    name: 'treatmentRecommendationsFlow',
    inputSchema: TreatmentRecommendationsInputSchema,
    outputSchema: TreatmentRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
