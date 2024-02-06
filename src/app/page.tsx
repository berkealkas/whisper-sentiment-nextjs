'use client'

import Whisper from "@components/Whisper";
import Sentiment from "@components/Sentiment";
import { useSelector } from "react-redux";
import { selectTranscriptOutput } from "@redux/features/transcriptSlice";
import TextToSpeech from "@components/TextToSpeech";

function App() {
    const transcriptOutput = useSelector(selectTranscriptOutput)

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='flex flex-col justify-center items-center gap-y-3'>
                <h1 className='text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl text-center'>
                    Whisper Sentiment
                </h1>
                <h2 className='mt-3 mb-5 px-4 text-center text-1xl font-semibold tracking-tight text-slate-900 sm:text-2xl'>
                    ML-powered speech recognition and sentiment analysis
                </h2>
                <Whisper />
                
                {/* {transcriptOutput !== null &&
                <>
                    <Sentiment transcribedData={transcriptOutput}/>
                    <TextToSpeech transcribedData={transcriptOutput}/>
                </> */}
                
                <Sentiment transcribedData={transcriptOutput}/>
                    <TextToSpeech transcribedData={transcriptOutput}/>
            </div>
        </div>
    );
}

export default App;
