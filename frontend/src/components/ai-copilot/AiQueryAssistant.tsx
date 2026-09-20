import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  User,
  Sparkles,
  Send,
  Mic,
  MicOff,
  ShieldCheck,
  RotateCcw,
  Lightbulb,
  FileText,
  TrendingUp,
  Volume2,
  Calendar,
  Layers,
  Sprout
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';
import { useLanguage } from '../../context/LanguageContext';
import { EvidenceViewer } from './EvidenceViewer';
import { FarmDocument, AiQuery } from '../../types/farm';

interface AiQueryAssistantProps {
  onViewDocument?: (doc: FarmDocument) => void;
  initialPrompt?: string;
}

export const AiQueryAssistant: React.FC<AiQueryAssistantProps> = ({
  onViewDocument,
  initialPrompt
}) => {
  const { aiQueries, askAiCopilot } = useFarm();
  const { t } = useLanguage();

  const [inputQuery, setInputQuery] = useState(initialPrompt || '');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'How much did I spend on fertilizers for Field A in Rabi 2025-26?',
    'What was our wheat yield, cost, and net profit for Field A?',
    'When was the last pesticide spray and what was the chemical used?',
    'Show me all expenses for Field B Soybean in Kharif 2025',
    'What are the NPK soil test recommendations for Field A?',
    'Summarize all irrigation activities logged this season'
  ];

  useEffect(() => {
    if (initialPrompt) {
      setInputQuery(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiQueries, isLoading]);

  const handleSubmit = async (qText?: string) => {
    const textToSend = qText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    setIsLoading(true);
    setInputQuery('');
    try {
      await askAiCopilot(textToSend);
    } catch (err) {
      console.error('AI query error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    // Simulate voice recording transcription
    setTimeout(() => {
      setInputQuery('How much did I spend on fertilizers for Field A in Rabi 2025-26?');
      setIsRecording(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel-glow rounded-2xl p-6 border border-emerald-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <div className="h-full w-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Bot className="h-6 w-6 text-emerald-400 animate-pulse-subtle" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Farm AI Copilot & Query Engine</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Grounded in PostgreSQL Records
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                Ask natural questions in plain English or regional languages. Responses cite exact database records, activity IDs, and original invoices.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-emerald-400">100% Traceable</div>
              <div className="text-[11px] text-slate-400">Zero Hallucinations</div>
            </div>
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Suggested Question Chips */}
        <div className="mt-5 pt-4 border-t border-slate-800/80">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
            <Lightbulb className="h-3.5 w-3.5 text-harvest-400" />
            <span>Try Asking Common Farm Questions:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((sq, idx) => (
              <button
                key={idx}
                onClick={() => handleSubmit(sq)}
                className="text-left text-xs px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-emerald-950/60 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 transition-all shadow-sm"
              >
                "{sq}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat History Stream */}
      <div className="space-y-4">
        {aiQueries.map(q => (
          <div key={q.id} className="space-y-3">
            {/* User Question Bubble */}
            <div className="flex items-start justify-end gap-3">
              <div className="max-w-xl rounded-2xl rounded-tr-sm bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 text-xs text-white shadow-md">
                <p className="font-medium leading-relaxed">{q.question}</p>
                <span className="block text-right text-[10px] text-emerald-200/80 mt-1 font-mono">
                  {new Date(q.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 flex-shrink-0">
                <User className="h-4 w-4" />
              </div>
            </div>

            {/* AI Answer Bubble */}
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-emerald-950 border border-emerald-600/40 flex items-center justify-center text-emerald-400 flex-shrink-0 shadow-sm">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex-1 max-w-3xl glass-panel rounded-2xl rounded-tl-sm p-4 lg:p-5 border border-slate-800 space-y-3 shadow-lg">
                {/* Answer text */}
                <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-line space-y-1.5">
                  {q.answer}
                </div>

                {/* Metric Badges if present */}
                {q.summary_metrics && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80">
                    {q.summary_metrics.total_cost !== undefined && (
                      <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/60">
                        <div className="text-[10px] text-slate-400 font-medium">Total Cost</div>
                        <div className="text-xs font-bold text-amber-300 font-mono">
                          ₹{q.summary_metrics.total_cost.toLocaleString('en-IN')}
                        </div>
                      </div>
                    )}
                    {q.summary_metrics.total_revenue !== undefined && (
                      <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/60">
                        <div className="text-[10px] text-slate-400 font-medium">Total Revenue</div>
                        <div className="text-xs font-bold text-emerald-400 font-mono">
                          ₹{q.summary_metrics.total_revenue.toLocaleString('en-IN')}
                        </div>
                      </div>
                    )}
                    {q.summary_metrics.net_profit !== undefined && (
                      <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/60">
                        <div className="text-[10px] text-slate-400 font-medium">Net Profit</div>
                        <div className="text-xs font-bold text-teal-300 font-mono">
                          ₹{q.summary_metrics.net_profit.toLocaleString('en-IN')}
                        </div>
                      </div>
                    )}
                    {q.summary_metrics.quantity && (
                      <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/60">
                        <div className="text-[10px] text-slate-400 font-medium">Recorded Volume</div>
                        <div className="text-xs font-semibold text-slate-200 truncate font-mono">
                          {q.summary_metrics.quantity}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Evidence Traceability Section */}
                <EvidenceViewer
                  evidenceList={q.evidence_list}
                  onViewDocument={onViewDocument}
                />
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-emerald-950 border border-emerald-600/40 flex items-center justify-center text-emerald-400 flex-shrink-0 animate-pulse">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="glass-panel rounded-2xl rounded-tl-sm p-4 border border-slate-800 flex items-center gap-3 text-xs text-slate-400">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]"></span>
              </div>
              <span>Searching digital farm history records and verifying evidence...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Input Box Bar */}
      <div className="sticky bottom-4 z-30">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
          className="glass-panel rounded-2xl p-2 border border-slate-800 shadow-2xl shadow-black/80 flex items-center gap-2 bg-slate-950/95"
        >
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={handleVoiceToggle}
            className={`p-2.5 rounded-xl transition-all ${
              isRecording
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
            }`}
            title={isRecording ? 'Listening...' : 'Click to speak question'}
          >
            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            placeholder={
              isRecording
                ? 'Listening to voice query...'
                : 'Ask anything about your farm history (e.g. "Wheat fertilizer cost in Field A")...'
            }
            className="flex-1 bg-transparent px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={isLoading || !inputQuery.trim()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white text-xs font-semibold shadow-md transition-all"
          >
            <span>Ask</span>
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
