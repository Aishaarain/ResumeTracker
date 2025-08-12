import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import {usePuterStore} from '../../lib/puter'
import { convertPdfToImage } from '../../lib/pdf2img';
import FileUploader from '../components/FileUploader';
import {generateUUID} from "../../lib/utils";
import {prepareInstructions} from "../../constants";
const Upload = () => {

   const { auth, isLoading, fs, ai, kv } = usePuterStore();
const navigate = useNavigate();
const [isProcessing, setIsProcessing] = useState(false);
const [statusText, setStatusText] = useState('');
const [file, setFile] = useState(null);

const handleFileSelect = (file) => {
    setFile(file);
};

const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }) => {
    setIsProcessing(true);

    setStatusText('Uploading the file...');
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusText('Error: Failed to upload file');

    setStatusText('Converting to image...');
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file) return setStatusText('Error: Failed to convert PDF to image');

    setStatusText('Uploading the image...');
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText('Error: Failed to upload image');

    setStatusText('Preparing data...');
    const uuid = generateUUID();
    const data = {
        id: uuid,
        resumePath: uploadedFile.path,
        imagePath: uploadedImage.path,
        companyName,
        jobTitle,
        jobDescription,
        feedback: '',
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText('Analyzing...');

    const feedback = await ai.feedback(
        uploadedFile.path,
        prepareInstructions({ jobTitle, jobDescription })
    );
    if (!feedback) return setStatusText('Error: Failed to analyze resume');

    const feedbackText = typeof feedback.message.content === 'string'
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText('Analysis complete, redirecting...');
    console.log(data);
    navigate(`/resume/${uuid}`);
};

const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget.closest('form');
    if (!form) return;
    const formData = new FormData(form);

    const companyName = formData.get('company-name');
    const jobTitle = formData.get('job-title');
    const jobDescription = formData.get('job-description');

    if (!file) return;

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
};


  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar/>
    
    <section className="flex  flex-col items-center gap-5 pt-12 mx-15 pb-5 ">
        <div className='flex flex-col  items-center gap-y-2 max-w-4xl text-center'>
            <h1 className='text-3xl font-bold'>Smart feedback for your dream job</h1>
            {isProcessing? (
                <>
                <h2 className='text-gray-600'>{statusText}
                    </h2>
                    <img src="/images/resume-scan.gif" alt="gif" className='w-full' />
                    </>):
                    (
                     <h2 className='text-gray-600 '>Drop your resume for an ATS score and improvement tips</h2>
                    )
                }
                {!isProcessing && (
                    <form className="flex flex-col px-3 items-start w-full" onSubmit={handleSubmit}>
                        <div className='flex flex-col   mt-8 w-full text-start text-gray-600 items-start;'>
<label htmlFor="company-name">Company Name</label>
<input className='  py-1  rounded-xl pl-1' type="text" name="company-name" id='company-name' placeholder='Company Name' />
                        </div>
                         <div className='flex flex-col  gap-2 mt-8 w-full text-start text-gray-600 items-start;'>
<label htmlFor="job-title">Job Title</label>
<input className=' px-10 py-1 rounded-xl pl-1' type="text" name="job-title" id='job-title' placeholder='Job Title' />
                        </div>
                         <div className='flex flex-col  gap-2 mt-8 w-full text-start text-gray-600 items-start;'>
<label htmlFor="job-description">Job Description</label>
<textarea className=' px-10 py-1 rounded-xl pl-1' rows={5} type="text" name="job-description" id='job-description' placeholder='Job Description' />
                        </div>
                         <div className='flex flex-col  gap-2 mt-8 w-full text-start text-gray-600 items-start;'>
<label htmlFor="uploader">Upload Resume</label>
<FileUploader onFileSelect={handleFileSelect}/>
                        </div>
                        <button className="bg-gradient-to-b justify-center mt-5 from-[#8e98ff] to-[#606beb] shadow-[0px_74px_21px_0px_#6678ef00] text-white rounded-full px-4 py-2 cursor-pointer w-full" type='submit'>Analyze Resume</button>
                    </form>
                )}
        </div>
        </section>
        </main>
  )
}

export default Upload