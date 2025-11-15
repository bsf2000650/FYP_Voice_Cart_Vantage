import React from "react";
import useSpeechToText from "../../../hooks/useSpeechToText/useSpeechToText";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const EventName = ({ name, setName }) => {
  const { isListening, transcript, startListening, stopListening } =
    useSpeechToText({ continuous: true });

  const startStopListening = () => {
    isListening ? stopVoiceInput() : startListening();
  };

  const stopVoiceInput = () => {
    setName(
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
        rows="2"
        required
        name="name"
        value={
          isListening
            ? name +
              (transcript.length ? (name.length ? " " : "") + transcript : "")
            : name
        }
        disabled={isListening}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your event name..."
        className="w-full pt-2 px-6 pb-2 border border-gray-300 rounded-[50px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff7e29] sm:text-sm"
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

export default EventName;
