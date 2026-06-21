import { PDFParse } from "pdf-parse";
// @ts-ignore
import * as pdfWorker from 'pdfjs-dist/legacy/build/pdf.worker.mjs';

// Statically assign the worker to globalThis to bypass dynamic workerSrc imports
if (typeof globalThis !== 'undefined' && !(globalThis as any).pdfjsWorker) {
  (globalThis as any).pdfjsWorker = pdfWorker;
}

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const parser = new PDFParse({ data: buffer });
    const data = await parser.getText();
    return data.text.trim();
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error('Failed to extract text from PDF');
  }
}