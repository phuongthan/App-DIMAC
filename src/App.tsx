import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopBarSwitcher } from './components/common/TopBarSwitcher';
import { MobileLayout } from './components/mobile/MobileLayout';
import { AdminLayout } from './components/admin/AdminLayout';
import { LawyerEditModal } from './components/common/LawyerEditModal';
import { FirmInfoEditModal } from './components/common/FirmInfoEditModal';

const MainAppContent: React.FC = () => {
  const { viewMode } = useApp();

  return (
    <div className="min-h-screen bg-[#F4F6F5] text-[#112216] flex flex-col font-sans antialiased selection:bg-[#1B5E34] selection:text-white">
      {/* Top Header Switcher */}
      <TopBarSwitcher />

      {/* Main View Router */}
      <div className="flex-1 flex flex-col">
        {viewMode === 'mobile' && (
          <div className="flex-1 flex items-center justify-center p-2 sm:p-6 bg-[#EDF1EE] relative overflow-hidden">
            {/* DIMAC architectural backdrop accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1B5E34]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#A0322D]/5 rounded-full blur-3xl pointer-events-none" />
            <MobileLayout />
          </div>
        )}

        {viewMode === 'admin' && (
          <div className="flex-1 flex flex-col bg-[#F4F6F5]">
            <AdminLayout />
          </div>
        )}

        {viewMode === 'split' && (
          <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 min-h-[calc(100vh-60px)]">
            {/* Left: Mobile App Simulator */}
            <div className="xl:col-span-5 border-r border-[#DCE5DF] p-4 sm:p-6 bg-[#EDF1EE] flex items-center justify-center relative">
              <div className="w-full flex justify-center">
                <MobileLayout isEmbedded={true} />
              </div>
            </div>

            {/* Right: Admin CMS Portal */}
            <div className="xl:col-span-7 flex flex-col overflow-y-auto bg-[#F4F6F5]">
              <AdminLayout />
            </div>
          </div>
        )}
      </div>

      {/* Global Modals */}
      <LawyerEditModal />
      <FirmInfoEditModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

export default App;
