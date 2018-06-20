// logs
import { get } from './index.js';

// log-system
export function getTreeList(type) {
  return get('/logs/tree', { params: type });
  // return get('../treeData-system.json');
}

export function getSystemLogs(data) {
  return get('/logs', { params: data });
  // return get('../log-business.json');
}

export function getTraces(traceId) {
  return get(`/logs/calls?traceId=${traceId}`);
  // return get('../log-trace.json');
}

// log-video
export function getVideoPreviews() {
  return get('/logs/video-previews');
  // return get('../video-previews.json');
}
export function getVideoPlaybacks() {
  return get('/logs/video-playbacks');
  // return get('../video-playbacks.json');
}
