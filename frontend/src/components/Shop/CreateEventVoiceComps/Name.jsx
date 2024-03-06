
import useSpeechToText from '../../../hooks/useSpeechToText/useSpeechToText';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

const EventName = ({ name, setName }) => {
    
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
    setName(prevVal => prevVal + (transcript.length ? (prevVal.length ? ' ' : '') + transcript : ''));
    stopListening();
  }

  return (
    <div>
        
        <textarea
            cols="30"
            required
            rows="2"
            type="text"
            name="name"
            value={isListening ? name + (transcript.length ? (name.length ? ' ' : '') + transcript : name) : name}
            disabled={isListening}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your event product name..."
          >
          {name}
          </textarea>
          <button  className="voiceBtns stop" onClick={startStopListening}> {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}</button>
    </div>
  )
}

export default EventName
