import { Pinecone } from '@pinecone-database/pinecone'
import { downloadFromS3 } from './s3-server';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export const getPineconeClient = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
})

export async function loadS3IntoPinecone(file_key: string) {
    // 1. Obtain the pdf -> download and read from pdf
    console.log('downloading from s3 into file system');
    const file_name = await downloadFromS3(file_key);
    if (!file_name) {
        throw new Error('Failed to download from s3');
    }
    const loader = new PDFLoader(file_name);
    const pages = await loader.load();
    return pages;
}