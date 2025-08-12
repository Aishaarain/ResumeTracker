import React from 'react'
import Score from './Score'
import ScoreBadge from './Scorebadge';
const Category = ({ title, score }) => {
    const textColor = score > 70 
        ? 'text-green-600'
        : score > 49
        ? 'text-yellow-600' 
        : 'text-red-600';
    
    return (
        <div className="flex flex-row items-center justify-center p-4 gap-4">
            <div className=" flex flex-row gap-2 items-center bg-gray-50 rounded-2xl p-4 w-full justify-between">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <p className="text-xl max-sm:text-lg font-bold">{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className="text-xl max-sm:text-lg italic">
                    <span className={textColor}>{score}</span>/100
                </p>
            </div>
        </div>
    )
}

const Summary = ({feedback}) => {
  return (
    <div className='bg-white rounded-2xl shadow-md w-full'>
        <div className='flex flex-row max-sm:flex-col items-center p-2 gap-3'>
            <Score score={feedback.overallScore}/>
            <div className='flex flex-col gap-2 '>
<h2 className='text-2xl font-bold'>Your Resume Score</h2>
<p className='text-sm text-gray-500'>This score is calculated based on the variables listed below</p>
            </div>
        </div>
        <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
        <Category title="Content " score={feedback.content.score} />
        <Category title="Structure" score={feedback.structure.score} />
        <Category title="Skills" score={feedback.skills.score} />
    </div>
  )
}

export default Summary