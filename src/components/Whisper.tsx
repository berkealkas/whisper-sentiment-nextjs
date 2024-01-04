'use client'

import { AudioManager } from "@components/AudioManager";
import Transcript from "@components/Transcript";
import { useTranscriber } from "@hooks/useTranscriber";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTranscript } from "@redux/features/transcriptSlice";

function Whisper() {
    const transcriber = useTranscriber();
    const dispatch = useDispatch();

    useEffect(() => {
        if (transcriber.output !== undefined) {
            dispatch(setTranscript(transcriber.output))
        }
    }, [transcriber])

    return (
        <div>
            <AudioManager transcriber={transcriber} />
            <Transcript transcribedData={transcriber.output} />
        </div>
    );
}

export default Whisper;
