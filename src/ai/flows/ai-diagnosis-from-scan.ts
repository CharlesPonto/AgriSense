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
  reasoning: z.string().describe('The reasoning steps used to arrive at the diagnosis.'),
  treatmentRecommendations: z.string().describe('Treatment recommendations for the diagnosed issues.'),
});
export type AiDiagnosisFromScanOutput = z.infer<typeof AiDiagnosisFromScanOutputSchema>;

export async function aiDiagnosisFromScan(input: AiDiagnosisFromScanInput): Promise<AiDiagnosisFromScanOutput> {
  return aiDiagnosisFromScanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiDiagnosisFromScanPrompt',
  input: {schema: AiDiagnosisFromScanInputSchema},
  output: {schema: AiDiagnosisFromScanOutputSchema},
  prompt: `You are an AI assistant specialized in diagnosing crop diseases and issues based on uploaded scans and historical data.

  Analyze the provided crop scan and historical data to identify potential diseases or issues affecting the crop. Provide a detailed diagnosis, including the reasoning steps used to arrive at the diagnosis, and offer treatment recommendations.

  Crop Scan:
  {{media url=cropScanDataUri}}

  Historical Data: {{{historicalData}}}

  Respond with the following structure:

  Diagnosis: [Diagnosis of potential diseases or issues]
  Reasoning: [Reasoning steps used to arrive at the diagnosis]
  Treatment Recommendations: [Treatment recommendations for the diagnosed issues]`,
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
