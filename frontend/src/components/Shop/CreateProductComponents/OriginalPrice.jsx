
import useSpeechToText from '../../../hooks/useSpeechToText/useSpeechToText';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

const ProductName = ({ originalPrice, setOriginalPrice }) => {
    
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
    setOriginalPrice(prevVal => prevVal + (transcript.length ? (prevVal.length ? ' ' : '') + transcript : ''));
    stopListening();
  }

  return (
    <div>
        
        <textarea
            cols="30"
            required
            rows="2"
            type="number"
            name="productName"
            value={isListening ? originalPrice + (transcript.length ? (originalPrice.length ? ' ' : '') + transcript : originalPrice) : originalPrice}
            disabled={isListening}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your product description..."
          >
          {originalPrice}
          </textarea>
          <button  className="voiceBtns stop" onClick={startStopListening}> {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}</button>
    </div>
  )
}

export default ProductName
