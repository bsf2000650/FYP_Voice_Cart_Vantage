import React, { useState } from 'react'
import useSpeechToText from '../../../hooks/useSpeechToText/useSpeechToText';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

const ProductName = ({ productName, setProductName }) => {
    
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
  } = useSpeechToText({continuous:true});

  const startStopListening = () => {
    isListening ? stopVoiceInput() : startListening()
  }

  const stopVoiceInput = () => {
    setProductName(prevVal => prevVal + (transcript.length ? (prevVal.length ? ' ' : '') + transcript : ''));
    stopListening();
  }

  return (
    <div>
        
        <textarea
            cols="30"
            required
            rows="2"
            type="text"
            name="productName"
            value={isListening ? productName + (transcript.length ? (productName.length ? ' ' : '') + transcript : productName) : productName}
            disabled={isListening}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter your product name..."
          >
          {productName}
          </textarea>
          <button  className="voiceBtns stop" onClick={startStopListening}> {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}</button>
    </div>
  )
}

export default ProductName
