import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {resumes} from "../../constants";
import ResumeCard from '../components/ResumeCard'
import { usePuterStore } from "../../lib/puter";
export function meta() {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
    const { auth } = usePuterStore();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (auth.isAuthenticated ) {
        navigate('/auth');
      }
    }, [auth.isAuthenticated]);
  
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar/>
    
    <section className="flex  flex-col items-center gap-8 pt-12 mx-15 pb-5 ">
      <div className="flex flex-col items-center gap-8 max-w-4xl text-center py-5 max-sm:px-3">
        <h1 className="text-3xl font-bold  ">Track Applications & <br /> Resume Rating</h1>
        <h2 className="text-2xl ">Review Your Submissions and check AI-powered feedback</h2>
      </div>
   
{resumes.length >0 &&(
<div className=" flex flex-wrap max-lg:flex-col max-sm:gap-y-10 md:gap-y-40 max-md:p-5 pt-10  w-full max-w-[1850px] justify-evenly items-center">
{resumes.map((res) => (
  <ResumeCard key={res.id} resume={res}/>
))}
    </div>
)}
    
    </section>
  </main>
}
