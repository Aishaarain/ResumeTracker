import React, { useEffect ,useState} from 'react'
import { useParams,Link,useNavigate } from 'react-router-dom'
import { usePuterStore } from '../../lib/puter';
import Summary from '../components/Summary';
import Details from '../components/Details';
import Ats from '../components/Ats';
export const meta = [
  { title: 'Resumind | Auth' },
  { name: 'description', content: 'log into your account' }
];
const Resume = () => {
   const { auth, isLoading, fs, kv } = usePuterStore();
const { id } = useParams();
const [imageUrl, setImageUrl] = useState('');
const [resumeUrl, setResumeUrl] = useState('');
const [feedback, setFeedback] = useState(null);
const navigate = useNavigate();

useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
        navigate(`/auth?next=/resume/${id}`);
    }
}, [isLoading, auth.isAuthenticated, navigate, id]);

useEffect(() => {
    const loadResume = async () => {
        const resume = await kv.get(`resume:${id}`);
        if (!resume) return;

        const data = JSON.parse(resume);

        const resumeBlob = await fs.read(data.resumePath);
        if (!resumeBlob) return;

        const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
        const resumeUrl = URL.createObjectURL(pdfBlob);
        setResumeUrl(resumeUrl);

        const imageBlob = await fs.read(data.imagePath);
        if (!imageBlob) return;

        const imageUrl = URL.createObjectURL(imageBlob);
        setImageUrl(imageUrl);

        setFeedback(data.feedback);
        console.log({ resumeUrl, imageUrl, feedback: data.feedback });
    };

    loadResume();
}, [id, fs, kv]);


  return (
   <main className='!pt-0'>
<nav className='flex flex-row justify-between items-center p-4 border-b border-gray-200;'>
    <Link to='/' className='flex flex-row items-center gap-2 border border-gray-200 rounded-lg p-2 shadow-sm;'>
    <img src="/icons/back.svg" alt="logo" className='w-2.5 h-2.5' />
    <span className='text-gray-800 text-sm font-semibold'>Back to Homepage</span>
    </Link>
</nav>
<div className='flex flex-row w-full max-lg:flex-col-reverse '>
    <section className=' flex flex-col gap-8  px-8 max-lg:w-full py-6 bg-[url("/images/bg-small.svg")] bg-cover h-[150vh] sticky top-0 items-center justify-around w-1/2 '>
{imageUrl && resumeUrl &&(
    <div className='animate-in duration-1000  max-sm:m-0 h-[90%]  max-w-xl:h-fit  bg-gradient-to-b from-light-blue-100 to-light-blue-200 p-4 rounded-2xl'>
        <a href={resumeUrl} target='_blank' rel='noopener noreferrer'>
            <img src={imageUrl} alt="" className=' w-full h-full object-contain rounded-2xl'/>
            
        </a>
      <a href={resumeUrl}><p className='bg-gradient-to-b from-[#8e98ff] to-[#606beb] shadow-[0px_74px_21px_0px_#6678ef00] text-white rounded-full px-4 py-2 cursor-pointer  w-fit'> click to review pdf</p></a> 
    </div>
)}

    </section>
    <section className='flex flex-col gap-8 w-1/2 px-8 max-lg:w-full py-6'>
    <h2 className='text-4xl !text-black font-bold'>Resume Review</h2>
    {feedback?(
        <div className='flex flex-col gap-8 animate-in fade-in duration-1000'>
<Summary feedback={feedback}/>
<Ats score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []}/>
<Details feedback={feedback}/>
        </div>
    ):(
        <img src="/images/resume-scan-2.gif" className='w-full' alt="" />
    )}
    </section>
</div>

   </main>
  )
}

export default Resume