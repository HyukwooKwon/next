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
  points: number; // 포인트 필드 추가
  subscriptionActive: boolean;
  setJwtToken: (token: string) => void;
  setPoints: (points: number) => void; // 포인트를 설정하는 메서드 추가
  setSubscriptionActive: (active: boolean) => void; // 구독 상태 추가
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
  points: 0,
  subscriptionActive: false, // ✅ 이 초기 상태가 반드시 추가되어야 합니다.
  setJwtToken: (token: string) => set({ jwtToken: token }),
  setPoints: (points) => set({ points }), // 포인트 상태 업데이트 메서드
  setSubscriptionActive: (active) => set({ subscriptionActive: active }),
  clearJwtToken: () => set({ jwtToken: null }),
}));
