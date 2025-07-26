"use client";

import { useState, useRef } from "react";
import { Loader2, Send, Paperclip, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserSession } from "@/contexts/UserSessionContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

interface Message {
  type: "user" | "ai";
  text: string;
  files?: File[];
}

interface SelectedFile {
  file: File;
  preview?: string;
}

const AiAgent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "ai",
      text: "Hello! How can I assist you with your finances today?",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { userSession } = useUserSession();

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles: SelectedFile[] = Array.from(files).map((file) => {
      const selectedFile: SelectedFile = { file };

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          selectedFile.preview = e.target?.result as string;
          setSelectedFiles((prev) => [...prev]);
        };
        reader.readAsDataURL(file);
      }

      return selectedFile;
    });

    setSelectedFiles((prev) => [...prev, ...newFiles]);

    // Clear the input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Remove selected file
  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Open file dialog
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleSendMessage = async () => {
    if (input.trim() === "" && selectedFiles.length === 0) return;

    const userMessage: Message = {
      type: "user",
      text: input || "Attached files",
      files: selectedFiles.map((sf) => sf.file),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSelectedFiles([]);
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/agent/query`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userSession.userId,
            session_id: userSession.sessionId,
            message: userMessage.text,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch AI response");

      const data = await response.json();
      setMessages((prev) => [...prev, { type: "ai", text: data.reply }]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex-1  rounded-lg p-4 overflow-y-auto mb-4 shadow-inner">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-4 ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-3/4 p-3 rounded-xl shadow-sm ${
                msg.type === "user"
                  ? "bg-gray-800 text-white rounded-br-none"
                  : "bg-gray-900 text-white rounded-bl-none"
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSanitize]}
              >
                {msg.text}
              </ReactMarkdown>

              {/* Display attached files */}
              {msg.files && msg.files.length > 0 && (
                <div className="mt-2 space-y-2">
                  {msg.files.map((file, fileIndex) => (
                    <div
                      key={fileIndex}
                      className="flex items-center gap-2 p-2 bg-gray-700 rounded text-sm"
                    >
                      {file.type.startsWith("image/") ? (
                        <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-xs">
                          🖼️
                        </div>
                      ) : file.type === "application/pdf" ? (
                        <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center text-xs">
                          📄
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-gray-500 rounded flex items-center justify-center text-xs">
                          📎
                        </div>
                      )}
                      <span className="truncate">{file.name}</span>
                      <span className="text-xs text-gray-400">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && <Loader2 className="h-8 w-8 animate-spin" />}
      </div>
      <div className="flex items-center gap-2">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.bmp,.webp"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex-1 relative">
          {/* Selected Files Display inside input */}
          {selectedFiles.length > 0 && (
            <div className="absolute top-0 left-0 right-0 bg-gray-900 border border-gray-300 border-b-0 p-2 z-0">
              {" "}
              <div className="flex flex-wrap gap-1">
                {selectedFiles.map((selectedFile, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-gray-700 text-white px-2 py-1 rounded text-xs"
                    style={{ width: "fit-content" }}
                  >
                    {selectedFile.preview ? (
                      <img
                        src={selectedFile.preview}
                        alt="Preview"
                        className="w-4 h-4 object-cover rounded"
                      />
                    ) : (
                      <div className="w-4 h-4 bg-gray-600 rounded flex items-center justify-center text-xs">
                        📄
                      </div>
                    )}
                    <span className="max-w-20 truncate">
                      {selectedFile.file.name}
                    </span>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-400 hover:text-red-300 ml-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="relative w-full">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your question or attach file..."
              className={`w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                selectedFiles.length > 0 ? "pt-12 rounded-t-none" : ""
              }`}
            />
            <button
              onClick={openFileDialog}
              className={`
     absolute right-2 z-20 p-1 rounded
     ${selectedFiles.length > 0 ? "top-4" : "top-1/2 -translate-y-1/2"}
     text-gray-500 hover:text-gray-700
   `}
              title="Attach files"
            >
              <Paperclip size={20} />
            </button>
          </div>
        </div>

        <Button onClick={handleSendMessage} className="p-3 bg-gray-800">
          <Send size={20} />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        <Button
          variant="secondary"
          className="text-sm py-1 px-3"
          onClick={() => setInput("Tax Savings Tips")}
        >
          Tax Savings Tips
        </Button>
        <Button
          variant="secondary"
          className="text-sm py-1 px-3"
          onClick={() => setInput("Suggest Mutual Funds")}
        >
          Suggest Mutual Funds
        </Button>
      </div>
    </div>
  );
};

export default AiAgent;
