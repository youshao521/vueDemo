// process.env.ROUTE_BASE 是指运管中心本身的路由 base
// process.env.MOUNT_BASE 是指运管中心打包后放入的 webapp 目录，会被挂载到哪个路径下
export const apiBase = `${process.env.MOUNT_BASE}api`;
