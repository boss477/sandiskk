import React, { useState, useRef, useEffect } from 'react';

const COLORS = {
  dark: '#111111',
  panel: '#1A1A1A',
  sidebar: '#161616',
  red: '#DA1E28',
  redHover: '#B81922',
  metal: '#E0E0E0',
  grey: '#808080',
  border: '#2A2A2A',
  white: '#FFFFFF',
};

const S = {
  app: {
    display: 'flex',
    height: '100vh',
    backgroundColor: COLORS.dark,
    color: COLORS.metal,
    fontFamily: '"Segoe UI", sans-serif',
    overflow: 'hidden',
  },
  sidebar: {
    width: '240px',
    minWidth: '240px',
    backgroundColor: COLORS.sidebar,
    borderRight: `1px solid ${COLORS.border}`,
    display: 'flex',
    flexDirection: 'column',
  },
  sidebarHeader: {
    padding: '16px',
    borderBottom: `1px solid ${COLORS.border}`,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logo: {
    width: '28px',
    height: '28px',
    backgroundColor: COLORS.red,
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 900,
    color: COLORS.white,
    letterSpacing: '-1px',
  },
  logoText: {
    fontSize: '13px',
    fontWeight: 700,
    letterSpacing: '2px',
    color: COLORS.white,
    textTransform: 'uppercase',
  },
  newChatBtn: {
    margin: '12px',
    padding: '8px 12px',
    backgroundColor: 'transparent',
    border: `1px solid ${COLORS.border}`,
    borderRadius: '2px',
    color: COLORS.metal,
    fontSize: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    transition: 'all 0.15s',
  },
  sessionLabel: {
    padding: '8px 16px',
    fontSize: '10px',
    color: COLORS.grey,
    letterSpacing: '2px',
    textTransform: 'uppercase',
  },
  sessionItem: {
    padding: '9px 16px',
    fontSize: '12px',
    cursor: 'pointer',
    borderLeft: '2px solid transparent',
    transition: 'all 0.1s',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    height: '52px',
    borderBottom: `1px solid ${COLORS.border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    backgroundColor: COLORS.dark,
    flexShrink: 0,
  },
  chatNameInput: {
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${COLORS.border}`,
    color: COLORS.white,
    fontSize: '14px',
    fontWeight: 600,
    outline: 'none',
    padding: '2px 4px',
    width: '220px',
    letterSpacing: '0.5px',
  },
  exportBtn: {
    padding: '6px 14px',
    backgroundColor: 'transparent',
    border: `1px solid ${COLORS.border}`,
    borderRadius: '2px',
    color: COLORS.metal,
    fontSize: '11px',
    cursor: 'pointer',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.15s',
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  msgRow: (role) => ({
    display: 'flex',
    justifyContent: role === 'user' ? 'flex-end' : 'flex-start',
  }),
  bubble: (role) => ({
    maxWidth: '68%',
    padding: '12px 16px',
    borderRadius: '2px',
    backgroundColor: role === 'user' ? COLORS.red : COLORS.panel,
    border: `1px solid ${role === 'user' ? COLORS.red : COLORS.border}`,
    color: role === 'user' ? COLORS.white : COLORS.metal,
  }),
  bubbleMeta: {
    fontSize: '10px',
    fontFamily: '"Courier New", monospace',
    color: 'rgba(255,255,255,0.4)',
    marginBottom: '6px',
    letterSpacing: '0.5px',
  },
  bubbleText: {
    fontSize: '14px',
    lineHeight: '1.6',
    margin: 0,
    whiteSpace: 'pre-wrap',
  },
  processing: {
    color: COLORS.red,
    fontSize: '12px',
    fontFamily: '"Courier New", monospace',
    letterSpacing: '1px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  inputArea: {
    padding: '14px 20px',
    backgroundColor: COLORS.panel,
    borderTop: `1px solid ${COLORS.border}`,
    flexShrink: 0,
  },
  inputRow: {
    display: 'flex',
    gap: '10px',
    maxWidth: '860px',
    margin: '0 auto',
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.dark,
    border: `1px solid ${COLORS.border}`,
    borderRadius: '2px',
    color: COLORS.white,
    padding: '10px 14px',
    fontSize: '13px',
    fontFamily: '"Courier New", monospace',
    outline: 'none',
    resize: 'none',
    minHeight: '42px',
    maxHeight: '120px',
  },
  sendBtn: {
    padding: '0 20px',
    backgroundColor: COLORS.red,
    border: 'none',
    borderRadius: '2px',
    color: COLORS.white,
    fontSize: '13px',
    fontWeight: 700,
    cursor: 'pointer',
    letterSpacing: '1px',
    transition: 'background 0.15s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar: {
    textAlign: 'center',
    fontSize: '10px',
    color: COLORS.grey,
    fontFamily: '"Courier New", monospace',
    letterSpacing: '2px',
    marginTop: '8px',
    textTransform: 'uppercase',
  },
  emptyState: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    color: COLORS.grey,
  },
  emptyIcon: {
    fontSize: '48px',
    opacity: 0.3,
  },
  emptyText: {
    fontSize: '13px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    opacity: 0.5,
  },
};

let sessionCounter = 2;

function createSession(name = null) {
  return {
    id: crypto.randomUUID(),
    name: name || `Session_${String(sessionCounter++).padStart(3, '0')}`,
    createdAt: new Date().toISOString(),
    messages: [],
  };
}

function buildOfflineReply(text) {
  const trimmed = text.trim();
  if (!trimmed) {
    return 'No input received.';
  }

  if (trimmed.toLowerCase().includes('help')) {
    return 'Offline mode active. Try: "status", "time", or any message to echo.';
  }

  if (trimmed.toLowerCase().includes('status')) {
    return `SYSTEM STATUS: OK\nMODE: OFFLINE\nTIMESTAMP: ${new Date().toISOString()}`;
  }

  if (trimmed.toLowerCase().includes('time')) {
    return `LOCAL TIME: ${new Date().toLocaleString()}`;
  }

  return `OFFLINE RESPONSE:\n${trimmed}`;
}

export default function App() {
  const [sessions, setSessions] = useState([createSession('Session_001')]);
  const [activeId, setActiveId] = useState(sessions[0].id);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hoverExport, setHoverExport] = useState(false);
  const [hoverSend, setHoverSend] = useState(false);
  const [hoverNew, setHoverNew] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const active = sessions.find((s) => s.id === activeId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [active?.messages, loading]);

  const updateSession = (id, updater) => {
    setSessions((prev) => prev.map((s) => (s.id === id ? updater(s) : s)));
  };

  const handleSend = async () => {
    if (!input.trim() || loading || !active) return;
    const text = input.trim();
    setInput('');
    setLoading(true);

    const userMsg = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    updateSession(activeId, (s) => ({ ...s, messages: [...s.messages, userMsg] }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 450));
      const reply = buildOfflineReply(text);

      const aiMsg = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: reply,
        timestamp: new Date().toISOString(),
      };

      updateSession(activeId, (s) => ({ ...s, messages: [...s.messages, aiMsg] }));
    } catch (err) {
      const errMsg = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `ERROR: ${err.message}`,
        timestamp: new Date().toISOString(),
      };
      updateSession(activeId, (s) => ({ ...s, messages: [...s.messages, errMsg] }));
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const downloadHistory = () => {
    if (!active) return;
    const blob = new Blob(
      [
        JSON.stringify(
          {
            session_name: active.name,
            session_id: active.id,
            created_at: active.createdAt,
            exported_at: new Date().toISOString(),
            messages: active.messages,
          },
          null,
          2,
        ),
      ],
      { type: 'application/json' },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${active.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const newChat = () => {
    const s = createSession();
    setSessions((prev) => [s, ...prev]);
    setActiveId(s.id);
  };

  const formatTime = (iso) =>
    new Date(iso).toLocaleTimeString('en-US', { hour12: false });

  return (
    <div style={S.app}>
      <aside style={S.sidebar}>
        <div style={S.sidebarHeader}>
          <div style={S.logo}>SD</div>
          <span style={S.logoText}>SanDisk</span>
        </div>

        <button
          style={{
            ...S.newChatBtn,
            borderColor: hoverNew ? COLORS.red : COLORS.border,
            color: hoverNew ? COLORS.red : COLORS.metal,
          }}
          onMouseEnter={() => setHoverNew(true)}
          onMouseLeave={() => setHoverNew(false)}
          onClick={newChat}
        >
          <span>＋</span> New Session
        </button>

        <div style={S.sessionLabel}>Sessions</div>

        {sessions.map((s) => (
          <div
            key={s.id}
            style={{
              ...S.sessionItem,
              borderLeftColor: activeId === s.id ? COLORS.red : 'transparent',
              backgroundColor: activeId === s.id ? 'rgba(218,30,40,0.08)' : 'transparent',
              color: activeId === s.id ? COLORS.white : COLORS.grey,
            }}
            onClick={() => setActiveId(s.id)}
          >
            📁 {s.name}
          </div>
        ))}
      </aside>

      <main style={S.main}>
        <header style={S.header}>
          <input
            style={S.chatNameInput}
            value={active?.name || ''}
            onChange={(e) =>
              updateSession(activeId, (s) => ({ ...s, name: e.target.value }))
            }
            spellCheck={false}
          />
          <button
            style={{
              ...S.exportBtn,
              borderColor: hoverExport ? COLORS.red : COLORS.border,
              color: hoverExport ? COLORS.red : COLORS.metal,
            }}
            onMouseEnter={() => setHoverExport(true)}
            onMouseLeave={() => setHoverExport(false)}
            onClick={downloadHistory}
          >
            ↓ Export JSON
          </button>
        </header>

        <div style={S.messages}>
          {active?.messages.length === 0 && !loading && (
            <div style={S.emptyState}>
              <div style={S.emptyIcon}>💾</div>
              <div style={S.emptyText}>Storage Ready · Awaiting Input</div>
            </div>
          )}

          {active?.messages.map((msg) => (
            <div key={msg.id} style={S.msgRow(msg.role)}>
              <div style={S.bubble(msg.role)}>
                <div style={S.bubbleMeta}>
                  {msg.role === 'user' ? 'INPUT_STREAM' : 'LLM_OUTPUT'} //{' '}
                  {formatTime(msg.timestamp)}
                </div>
                <p style={S.bubbleText}>{msg.content}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div style={S.processing}>
              <span style={{ animation: 'pulse 1s infinite' }}>▶</span>
              PROCESSING DATA...
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div style={S.inputArea}>
          <div style={S.inputRow}>
            <textarea
              ref={inputRef}
              style={S.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter command..."
              rows={1}
            />
            <button
              style={{
                ...S.sendBtn,
                backgroundColor: hoverSend ? COLORS.redHover : COLORS.red,
              }}
              onMouseEnter={() => setHoverSend(true)}
              onMouseLeave={() => setHoverSend(false)}
              onClick={handleSend}
            >
              ▶
            </button>
          </div>
          <div style={S.statusBar}>Storage Ready • Session Active • Enter to Send</div>
        </div>
      </main>
    </div>
  );
}
