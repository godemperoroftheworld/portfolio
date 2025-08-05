import type { App } from "vue";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";

export default (app: App) => {
  app.use(Vue3Toastify, {
    autoClose: 2000,
    toastClassName:
      "rounded-none! border-primary-500 border stroke-primary-500 fill-primary-500 text-primary-500",
    progressClassName: "bg-secondary-500",
    transition: "flip",
    containerClassName: "mt-10",
  } as ToastContainerOptions);
};
