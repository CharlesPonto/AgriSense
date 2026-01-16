'use server';
/**
 * @fileOverview An AI agent that diagnoses crop diseases and issues based on uploaded scans.
 *
 * - aiDiagnosisFromScan - A function that handles the crop scan diagnosis process.
 * - AiDiagnosisFromScanInput - The input type for the aiDiagnosisFromScan function.
 * - AiDiagnosisFromScanOutput - The return type for the aiDiagnosisFromScan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiDiagnosisFromScanInputSchema = z.object({
  cropType: z.string().describe('The type of crop being scanned (e.g., banana, cacao, corn, rice, durian).'),
  cropScanDataUri: z
    .string()
    .describe(
      "A crop scan, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  historicalData: z.string().describe('Historical data about the crop and field.'),
});
export type AiDiagnosisFromScanInput = z.infer<typeof AiDiagnosisFromScanInputSchema>;

const AiDiagnosisFromScanOutputSchema = z.object({
  diagnosis: z.string().describe('The diagnosis of potential diseases or issues.'),
  severityLevel: z.string().describe('The severity level of the diagnosis (e.g., Low, Medium, High).'),
  reasoning: z.string().describe('The reasoning steps used to arrive at the diagnosis.'),
  treatmentRecommendations: z.string().describe('Actionable recommendations for treatment and prevention.'),
});
export type AiDiagnosisFromScanOutput = z.infer<typeof AiDiagnosisFromScanOutputSchema>;

export async function aiDiagnosisFromScan(input: AiDiagnosisFromScanInput): Promise<AiDiagnosisFromScanOutput> {
  return aiDiagnosisFromScanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiDiagnosisFromScanPrompt',
  input: {schema: AiDiagnosisFromScanInputSchema},
  output: {schema: AiDiagnosisFromScanOutputSchema},
  prompt: `You are an AI assistant specialized in diagnosing crop diseases for farmers in the Davao region of the Philippines.

  Analyze the provided crop scan for a "{{{cropType}}}" crop, along with its historical data, to identify potential diseases or issues. Provide a detailed diagnosis, a severity level (Low, Medium, or High), the reasoning for your diagnosis, and actionable recommendations for treatment and prevention.

  Crop: {{{cropType}}}
  Scan: {{media url=cropScanDataUri}}
  Historical Data: {{{historicalData}}}

  Respond with the following structure.`,
});

const aiDiagnosisFromScanFlow = ai.defineFlow(
  {
    name: 'aiDiagnosisFromScanFlow',
    inputSchema: AiDiagnosisFromScanInputSchema,
    outputSchema: AiDiagnosisFromScanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
