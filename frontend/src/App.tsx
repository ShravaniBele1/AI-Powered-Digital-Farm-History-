import React, { useState, useEffect } from 'react';
import { FarmProvider } from './context/FarmContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar, NavTab } from './components/layout/Sidebar';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { FarmTimeline } from './components/timeline/FarmTimeline';
import { AiQueryAssistant } from './components/ai-copilot/AiQueryAssistant';
import { DocumentVault } from './components/documents/DocumentVault';
import { FinancialAnalytics } from './components/analytics/FinancialAnalytics';
import { FarmPassportModal } from './components/passport/FarmPassportModal';
import { DocumentScannerModal } from './components/documents/DocumentScannerModal';
import { DocumentPreviewModal } from './components/documents/DocumentPreviewModal';
import { AddActivityModal } from './components/forms/AddActivityModal';
import { FarmDocument } from './types/farm';

const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
  const [isScanBillOpen, setIsScanBillOpen] = useState(false);
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [previewDocument, setPreviewDocument] = useState<FarmDocument | null>(null);
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string | undefined>(undefined);

  // Keyboard shortcut Cmd+K or Ctrl+K for AI Copilot
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setActiveTab('ai_copilot');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAskAi = (prompt: string) => {
    setAiInitialPrompt(prompt);
    setActiveTab('ai_copilot');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-7xl mx-auto">
        {/* Sidebar Navigation */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Area */}
        <main className="flex-1 p-4 lg:p-8 min-w-0">
          {activeTab === 'dashboard' && (
            <DashboardOverview
              onNavigateTab={tab => setActiveTab(tab)}
              onOpenAddActivity={() => setIsAddActivityOpen(true)}
              onOpenScanBill={() => setIsScanBillOpen(true)}
              onOpenPassport={() => setIsPassportOpen(true)}
              onViewDocument={doc => setPreviewDocument(doc)}
              onAskAi={handleAskAi}
            />
          )}

          {activeTab === 'timeline' && (
            <FarmTimeline
              onOpenAddActivity={() => setIsAddActivityOpen(true)}
              onViewDocument={doc => setPreviewDocument(doc)}
              onAskAi={handleAskAi}
            />
          )}

          {activeTab === 'ai_copilot' && (
            <AiQueryAssistant
              onViewDocument={doc => setPreviewDocument(doc)}
              initialPrompt={aiInitialPrompt}
            />
          )}

          {activeTab === 'vault' && (
            <DocumentVault
              onOpenScanBill={() => setIsScanBillOpen(true)}
              onViewDocument={doc => setPreviewDocument(doc)}
            />
          )}

          {activeTab === 'analytics' && <FinancialAnalytics />}

          {activeTab === 'passport' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Digital Farm Passport</h2>
                  <p className="text-xs text-slate-400">Official verified farming credential for banking and crop insurance</p>
                </div>
                <button
                  onClick={() => setIsPassportOpen(true)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition-all"
                >
                  Open Full Certificate & Print
                </button>
              </div>
              <div
                onClick={() => setIsPassportOpen(true)}
                className="cursor-pointer hover:opacity-95 transition-opacity"
              >
                <div className="p-8 rounded-3xl bg-slate-900/60 border-2 border-dashed border-emerald-500/40 text-center space-y-3">
                  <div className="h-16 w-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <span className="text-3xl">📜</span>
                  </div>
                  <h3 className="text-base font-bold text-white">Click to View Official Farm Passport</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Features farmer identification, registered field parcels, verified seed & fertilizer audit trail, harvest sale records, and QR code verification.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Global Modals */}
      <AddActivityModal
        isOpen={isAddActivityOpen}
        onClose={() => setIsAddActivityOpen(false)}
      />

      <DocumentScannerModal
        isOpen={isScanBillOpen}
        onClose={() => setIsScanBillOpen(false)}
        onSuccess={() => setActiveTab('timeline')}
      />

      <DocumentPreviewModal
        document={previewDocument}
        onClose={() => setPreviewDocument(null)}
        onAskAiWithDoc={doc => {
          handleAskAi(`Tell me about document ${doc.file_name} and its linked expenses`);
        }}
      />

      <FarmPassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <FarmProvider>
        <MainApp />
      </FarmProvider>
    </LanguageProvider>
  );
}
