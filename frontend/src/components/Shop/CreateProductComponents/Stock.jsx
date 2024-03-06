import React, { useRef } from 'react';
import useSpeechToText from '../../../hooks/useSpeechToText/useSpeechToText';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

const ProductName = ({ stock, setStock }) => {

  const textareaRef = useRef(null); 
    
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
  } = useSpeechToText({continuous:true});

  const startStopListening = () => {
    isListening ? stopVoiceInput() : startListening();
    if (!isListening && textareaRef.current) {
      textareaRef.current.focus();
    }
  }

  const stopVoiceInput = () => {
    setStock(prevVal => prevVal + (transcript.length ? (prevVal.length ? ' ' : '') + transcript : ''));
    stopListening();
  }

  return (
    <div>
        
        <textarea
            ref={textareaRef} 
            cols="30"
            required
            rows="2"
            type="number"
            name="productName"
            value={isListening ? stock + (transcript.length ? (stock.length ? ' ' : '') + transcript : stock) : stock}
            disabled={isListening}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your product description..."
          >
          {stock}
          </textarea>
          <button  className="voiceBtns stop" onClick={startStopListening}> {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}</button>

    </div>
  )
}

export default ProductName
