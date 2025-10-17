declare module 'react-native-netinfo' {
  import { NetInfoState, NetInfoStateType, NetInfoConnectedDetails } from '@react-native-netinfo';
  
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
