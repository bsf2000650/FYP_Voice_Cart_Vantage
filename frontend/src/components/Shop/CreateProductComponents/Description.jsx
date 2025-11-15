import React from "react";
import useSpeechToText from "../../../hooks/useSpeechToText/useSpeechToText";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const Description = ({ description, setDescription }) => {
  const { isListening, transcript, startListening, stopListening } =
    useSpeechToText({ continuous: true });

  const startStopListening = () => {
    isListening ? stopVoiceInput() : startListening();
  };

  const stopVoiceInput = () => {
    setDescription(
      (prevVal) =>
        prevVal +
        (transcript.length ? (prevVal.length ? " " : "") + transcript : "")
    );
    stopListening();
  };

  return (
    <div className="relative w-full">
      <textarea
        cols="30"
        rows="6"
        required
        name="description"
        value={
          isListening
            ? description +
              (transcript.length
                ? (description.length ? " " : "") + transcript
                : "")
            : description
        }
        disabled={isListening}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter your product description..."
        className="w-full pt-2 px-6 pb-2 border border-gray-300 rounded-[20px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff7e29] sm:text-sm"
      />
      <button
        type="button"
        onClick={startStopListening}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-[#ff7e29] hover:text-[#e56f1f]"
      >
        {isListening ? (
          <FaMicrophoneSlash size={20} />
        ) : (
          <FaMicrophone size={20} />
        )}
      </button>
    </div>
  );
};

export default Description;
