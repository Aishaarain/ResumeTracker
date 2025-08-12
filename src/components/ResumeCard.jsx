import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import ScoreCircle from './ScoreCircle'
import { usePuterStore } from '../../lib/puter'

const ResumeCard = ({ resume }) => {
    const { id, companyName, jobTitle, feedback, imagePath } = resume;
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if (!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        };

        loadResume();
    }, [imagePath]);

  return (
    <Link to={`/resume/${resume.id}`} className='  animate-in duration-1000 flex flex-col gap-8 h-[560px]   w-full lg:w-[450px] xl:w-[490px] bg-white rounded-2xl p-4;'>
        <div className='flex flex-row gap-2 justify-between min-h-[110px] max-sm:flex-col items-center max-md:justify-center max-md:items-center;'>
        <div className='flex flex-col gap-2  '>
            {companyName&&<h2 className='text-black p-5 font-bold break-words'>
                {resume.companyName}
            </h2>}

            {jobTitle &&<h3 className='text-lg break-words pl-5 text-gray-500'>
                {resume.jobTitle}
            </h3>}
            {!companyName && !jobTitle &&  <h2 className='!text-black font-bold'>Resume</h2>}
        </div>
        <div className='flex-shrink-0'>
            <ScoreCircle score={resume.feedback.overallScore}/>
        </div>
        </div>

       {resumeUrl? ( <div className='bg-gradient-to-b from-light-blue-100 to-light-blue-200 p-4 rounded-2xl animate-in fade-in duration-1000 h-full flex items-center justify-center'>
            <img src={resumeUrl} alt="resume" className='w-full h-full object-cover object-top rounded-xl' />

        </div>):(
            <div className='bg-gradient-to-b from-light-blue-100 to-light-blue-200 p-4 rounded-2xl animate-in fade-in duration-1000 h-full flex items-center justify-center'>
            <img src={resume.imagePath} alt="resume" className='w-full h-full object-cover object-top rounded-xl' />

        </div>
        )}
    </Link>
  )
}

export default ResumeCard