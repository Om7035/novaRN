declare module 'react-native-netinfo' {
  export type NetInfoStateType = 'none' | 'unknown' | 'cellular' | 'wifi' | 'bluetooth' | 'ethernet' | 'wimax' | 'vpn' | 'other';
  
  export interface NetInfoConnectedDetails {
    isConnectionExpensive?: boolean;
    ssid?: string;
    bssid?: string;
    strength?: number;
    ipAddress?: string;
    subnet?: string;
    frequency?: number;
  }
  
  export interface NetInfoState {
    type: NetInfoStateType;
    isConnected: boolean | null;
    isInternetReachable: boolean | null;
    details: NetInfoConnectedDetails | null;
  }
  
  export function addEventListener(listener: (state: NetInfoState) => void): () => void;
  export function fetch(): Promise<NetInfoState>;
  
  export default {
    addEventListener,
    fetch,
  };
}
