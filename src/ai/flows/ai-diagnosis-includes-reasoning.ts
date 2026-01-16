'use server';
/**
 * @fileOverview An AI agent that diagnoses crop diseases and issues, including reasoning steps.
 *
 * - diagnoseCropIssue - A function that handles the crop issue diagnosis process.
 * - DiagnoseCropIssueInput - The input type for the diagnoseCropIssue function.
 * - DiagnoseCropIssueOutput - The return type for the diagnoseCropIssue function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiagnoseCropIssueInputSchema = z.object({
  scanDataUri: z
    .string()
    .describe(
      "A crop scan, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  historicalData: z.string().describe('The historical data of the crop.'),
});
export type DiagnoseCropIssueInput = z.infer<typeof DiagnoseCropIssueInputSchema>;

const DiagnoseCropIssueOutputSchema = z.object({
  diagnosis: z
    .string()
    .describe('The diagnosis of the crop issue, including reasoning steps.'),
  confidenceLevel: z.number().describe('The confidence level of the diagnosis.'),
  suggestedTreatment: z.string().describe('The suggested treatment for the diagnosed issue.'),
});
export type DiagnoseCropIssueOutput = z.infer<typeof DiagnoseCropIssueOutputSchema>;

export async function diagnoseCropIssue(
  input: DiagnoseCropIssueInput
): Promise<DiagnoseCropIssueOutput> {
  return diagnoseCropIssueFlow(input);
}

const prompt = ai.definePrompt({
  name: 'diagnoseCropIssuePrompt',
  input: {schema: DiagnoseCropIssueInputSchema},
  output: {schema: DiagnoseCropIssueOutputSchema},
  prompt: `You are an AI assistant that diagnoses crop diseases and issues based on crop scans and historical data. Include the reasoning steps you used to reach your conclusion, so the farmer can build trust in the result and learn more about the crops. Provide a confidence level for your diagnosis and suggest a treatment. 

Crop Scan: {{media url=scanDataUri}}
Historical Data: {{{historicalData}}}`,
});

const diagnoseCropIssueFlow = ai.defineFlow(
  {
    name: 'diagnoseCropIssueFlow',
    inputSchema: DiagnoseCropIssueInputSchema,
    outputSchema: DiagnoseCropIssueOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
