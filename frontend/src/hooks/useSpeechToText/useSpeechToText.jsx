import { useEffect, useRef, useState } from 'react';

const useSpeechToText = (options) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [prevTranscript, setPrevTranscript] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.log('Web speech api is not supported.');
      return;
    }

    recognitionRef.current = new window.webkitSpeechRecognition();
    const recognition = recognitionRef.current;
    recognition.interimResults = options.interimResults || true;
    recognition.lang = options.lang || "en-US";
    recognition.continuous = options.continuous || false;
    if ('webkitSpeechGrammarList' in window) {
      const grammar = "#JSGF V1.0; grammar punctuation; public <punc> = . | , | ? | ! | ; | : ; ";
      const speechRecognitionList = new window.webkitSpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      recognition.grammars = speechRecognitionList;
    }

    recognition.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }

      // If the transcript has changed, update the component state
      if (prevTranscript !== text) {
        setTranscript(text);
        setPrevTranscript(text);
      }
    }

    recognition.onerror = (event) => {
      console.log("Speech recognition error:", event.error);
    }

    recognition.onend = () => {
      setIsListening(false);
      setTranscript("");
      setPrevTranscript("");
    }

    return () => {
      recognition.stop();
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }

  const resetTranscript = () => {
    setTranscript("");
    setPrevTranscript("");
  }

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    recognition: recognitionRef.current,
  }
}

export default useSpeechToText;