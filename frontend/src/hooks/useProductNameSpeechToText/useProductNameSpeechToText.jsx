import React, { useEffect, useRef, useState } from 'react';

const useProductNameSpeechToText = (options) => {
  const [isProductNameListening, setIsProductNameListening] = useState(false);
  const [productNameTranscript, setProductNameTranscript] = useState("");
  const [prevproductNameTranscript, setPrevproductNameTranscript] = useState("");
  const productRecognitionRef = useRef(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.log('Web speech api is not supported.');
      return;
    }

    productRecognitionRef.current = new window.webkitSpeechRecognition();
    const productRecognition = productRecognitionRef.current;
    productRecognition.interimResults = options.interimResults || true;
    productRecognition.lang = options.lang || "en-US";
    productRecognition.continuous = options.continuous || false;
    if ('webkitSpeechGrammarList' in window) {
      const grammar = "#JSGF V1.0; grammar punctuation; public <punc> = . | , | ? | ! | ; | : ; ";
      const speechRecognitionList = new window.webkitSpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      productRecognition.grammars = speechRecognitionList;
    }

    productRecognition.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].productNameTranscript;
      }

      // If the productNameTranscript has changed, update the component state
      if (prevproductNameTranscript !== text) {
        setProductNameTranscript(text);
        setPrevproductNameTranscript(text);
      }
    }

    productRecognition.onerror = (event) => {
      console.log("Speech recognition error:", event.error);
    }

    productRecognition.onend = () => {
      setIsProductNameListening(false);
      setProductNameTranscript("");
      setPrevproductNameTranscript("");
    }

    return () => {
        productRecognition.stop();
    }
  }, []);

  const productNameStartListening = () => {
    if (productRecognitionRef.current && !isProductNameListening) {
      productRecognitionRef.current.start();
      setIsProductNameListening(true);
    }
  }

  const productNameStopListening = () => {
    if (productRecognitionRef.current && isProductNameListening) {
      productRecognitionRef.current.stop();
      setIsProductNameListening(false);
    }
  }

  const resetProductNameTranscript = () => {
    setProductNameTranscript("");
    setPrevproductNameTranscript("");
  }

  return {
    isProductNameListening,
    productNameTranscript,
    productNameStartListening,
    productNameStopListening,
    resetProductNameTranscript,
    productRecognition: productRecognitionRef.current,
  }
}

export default useProductNameSpeechToText;