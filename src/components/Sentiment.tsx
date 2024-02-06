'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { TranscriberData } from '@hooks/useTranscriber';

interface Props {
  transcribedData: TranscriberData | undefined;
}

export default function Sentiment({ transcribedData }: Props) {
  /* TODO: Add state variables */
  const [result, setResult] = useState(null);
  const [ready, setReady] = useState<boolean | null>(null);

  // Create a reference to the worker object.
  const worker = useRef<Worker | null>(null);

  // We use the `useEffect` hook to set up the worker as soon as the `App` component is mounted.
  useEffect(() => {
    if (!worker.current) {
      // Create the worker if it does not yet exist.
      worker.current = new Worker(new URL('../workers/sentimentWorker.js', import.meta.url), {
        type: 'module'
      });
    }

    // Create a callback function for messages from the worker thread.
    const onMessageReceived = (e: MessageEvent) => {
      switch (e.data.status) {
        case 'initiate':
          setReady(false);
          break;
        case 'ready':
          setReady(true);
          break;
        case 'complete':
          setResult(e.data.output[0])
          break;
      }
    };

    // Attach the callback function as an event listener.
    worker.current.addEventListener('message', onMessageReceived);

    // Define a cleanup function for when the component is unmounted.
    return () => worker.current?.removeEventListener('message', onMessageReceived);
  });

  const classify = useCallback((text: string) => {
    if (worker.current) {
      worker.current.postMessage({ text });
      console.log(text)
    }
  }, []);

  useEffect(() => {
    transcribedData?.chunks &&
      transcribedData.chunks.map((chunk, i) => (
        classify(chunk.text)
      ))
  }, [transcribedData])

  return (
    <div className="flex flex-col items-center justify-center p-12 w-full">
      {transcribedData?.chunks &&
        transcribedData.chunks.map((chunk, i) => (
          <div key={`${i}-${chunk.text}`} className='w-full flex flex-row'>
            <input
              className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
              type="text"
              onInput={e => {
                classify((e.target as HTMLInputElement).value);
              }}
              disabled
              value={chunk.text}
            />
          </div>
        ))}
      {ready !== null && (
        <pre className="bg-gray-100 p-2 rounded text-black">
          {(!ready || !result) ? 'Loading...' : JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  )
}