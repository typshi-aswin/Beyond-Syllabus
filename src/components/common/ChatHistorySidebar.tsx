"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Plus, MessageSquare, ChevronLeft, ChevronRight, History } from "lucide-react";
import { ChatSession, deleteChatSession } from "@/lib/chat-history";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

interface ChatHistorySidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSessionSelect: (sessionId: string) => void;
  onNewChat: () => void;
  onDeleteSession: (sessionId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function ChatHistorySidebar({
  sessions,
  currentSessionId,
  onSessionSelect,
  onNewChat,
  onDeleteSession,
  isCollapsed,
  onToggleCollapse
}: ChatHistorySidebarProps) {
  const [deletingSessionId, setDeletingSessionId] = useState<string | null>(null);

  const handleDeleteSession = async (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingSessionId(sessionId);
    
    // Add a small delay for visual feedback
    setTimeout(() => {
      deleteChatSession(sessionId);
      onDeleteSession(sessionId);
      setDeletingSessionId(null);
    }, 150);
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 60 : 320 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-card/50 border-r flex flex-col h-full"
    >
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Chat History</h2>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="ml-auto"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <Button
          onClick={onNewChat}
          className="w-full"
          size={isCollapsed ? "icon" : "default"}
        >
          <Plus className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">New Chat</span>}
        </Button>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {sessions.map((session) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <SessionCard
                session={session}
                isActive={session.id === currentSessionId}
                isDeleting={deletingSessionId === session.id}
                isCollapsed={isCollapsed}
                onClick={() => onSessionSelect(session.id)}
                onDelete={(e) => handleDeleteSession(session.id, e)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {sessions.length === 0 && !isCollapsed && (
          <div className="p-4 text-center text-muted-foreground">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No chat history yet</p>
            <p className="text-xs">Start a new chat to begin</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface SessionCardProps {
  session: ChatSession;
  isActive: boolean;
  isDeleting: boolean;
  isCollapsed: boolean;
  onClick: () => void;
  onDelete: (e: React.MouseEvent) => void;
}

function SessionCard({ session, isActive, isDeleting, isCollapsed, onClick, onDelete }: SessionCardProps) {
  return (
    <Card
      className={`m-2 cursor-pointer transition-all duration-200 hover:shadow-md group ${
        isActive 
          ? 'bg-primary/10 border-primary/30 shadow-sm' 
          : 'bg-background/50 hover:bg-accent/50'
      } ${
        isDeleting ? 'opacity-50 scale-95' : ''
      }`}
      onClick={onClick}
    >
      <div className="p-3">
        {isCollapsed ? (
          <div className="flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-sm line-clamp-2 flex-1">
                {session.title}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                onClick={onDelete}
                title="Delete chat"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {session.messages.filter(m => m.role !== 'system').length} messages
              </span>
              <span>
                {formatDistanceToNow(session.lastModified, { addSuffix: true })}
              </span>
            </div>
            
            {session.messages.length > 0 && (
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {session.messages
                  .filter(m => m.role !== 'system')
                  .slice(-1)[0]?.content
                  .substring(0, 100)}...
              </p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
