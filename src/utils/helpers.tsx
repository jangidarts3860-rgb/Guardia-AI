import React from 'react';

export const getBankLogo = (bankName: string) => {
  if (bankName.includes('HDFC')) {
    return (
      <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center border border-blue-800">
        <div className="w-5 h-5 bg-red-600 flex items-center justify-center">
          <div className="w-3 h-3 bg-blue-900"></div>
        </div>
      </div>
    );
  }
  if (bankName.includes('ICICI')) {
    return (
      <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center border border-orange-500 text-white font-bold text-xs">
        i
      </div>
    );
  }
  if (bankName.includes('SBI')) {
    return (
      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center border border-blue-400">
        <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
          <div className="w-1 h-3 bg-white translate-y-1"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 font-bold text-slate-400">
      {bankName.charAt(0)}
    </div>
  );
};

export const getSubscriptionLogo = (name: string) => {
  if (name.includes('Netflix')) {
    return (
      <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center border border-red-900/30">
        <span className="text-red-600 font-black text-xl font-serif">N</span>
      </div>
    );
  }
  if (name.includes('Spotify')) {
    return (
      <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center border border-green-900/30">
        <div className="w-6 h-6 rounded-full bg-green-500 flex flex-col items-center justify-center gap-[2px] p-1">
          <div className="w-full h-[2px] bg-black rounded-full mix-blend-overlay"></div>
          <div className="w-[80%] h-[2px] bg-black rounded-full mix-blend-overlay"></div>
          <div className="w-[60%] h-[2px] bg-black rounded-full mix-blend-overlay"></div>
        </div>
      </div>
    );
  }
  if (name.includes('Amazon') || name.includes('Prime')) {
    return (
      <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center border border-blue-400">
        <span className="text-white font-bold text-xs italic">prime</span>
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
      <span className="text-slate-400 font-bold">{name.charAt(0)}</span>
    </div>
  );
};
