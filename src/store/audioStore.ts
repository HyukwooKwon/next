import { create } from "zustand";

interface AudioState {
  isConnected: boolean;
  setConnected: (connected: boolean) => void;

  isSpeaking: boolean;
  setSpeaking: (speaking: boolean) => void;

  sttResult: string;
  setSttResult: (result: string) => void;

  debugMessages: string[];
  addDebugMessage: (msg: string) => void;

  // 🔑 JWT 토큰 상태 관리 추가
  jwtToken: string | null;
  setJwtToken: (token: string) => void;
  clearJwtToken: () => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  isConnected: false,
  setConnected: (connected) => set({ isConnected: connected }),

  isSpeaking: false,
  setSpeaking: (speaking) => set({ isSpeaking: speaking }),

  sttResult: "",
  setSttResult: (result) => set({ sttResult: result }),

  debugMessages: [],
  addDebugMessage: (msg) =>
    set((state) => ({
      debugMessages: [...state.debugMessages.slice(-4), msg],
    })),

  // 🔑 JWT 토큰 상태 초기화 및 관리 메서드
  jwtToken: null,
  setJwtToken: (token: string) => set({ jwtToken: token }),
  clearJwtToken: () => set({ jwtToken: null }),
}));
