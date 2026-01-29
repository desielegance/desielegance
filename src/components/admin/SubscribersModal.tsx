import { useState, useEffect } from "react";
import { X, Mail } from "lucide-react";

interface SubscribersModalProps {
  onClose: () => void;
}

interface Subscriber {
    _id: string;
    email: string;
    createdAt: string;
}

export function SubscribersModal({ onClose }: SubscribersModalProps) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await fetch("/api/subscribe");
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-ivory w-full max-w-md rounded-lg shadow-xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b bg-white rounded-t-lg shrink-0">
          <h2 className="text-xl font-serif text-obsidian flex items-center gap-2">
            <Mail size={20} /> Subscribed Emails
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1 bg-white/50">
          {loading ? (
            <p className="text-center text-obsidian/50 py-4">Loading...</p>
          ) : subscribers.length === 0 ? (
            <p className="text-center text-obsidian/50 py-4">No subscribers yet.</p>
          ) : (
            <ul className="space-y-2">
              {subscribers.map((sub) => (
                <li key={sub._id} className="p-3 bg-white border border-obsidian/5 rounded shadow-sm text-obsidian/80 font-mono text-sm flex justify-between items-center">
                    <span>{sub.email}</span>
                    <span className="text-xs text-obsidian/40">{new Date(sub.createdAt).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="p-3 border-t bg-gray-50 text-xs text-center text-obsidian/40 rounded-b-lg shrink-0">
            Total Subscribers: {subscribers.length}
        </div>
      </div>
    </div>
  );
}
