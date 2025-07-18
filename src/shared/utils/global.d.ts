declare global {
	interface Window {
		ymaps?: typeof import("yandex-maps");
	}
}
declare var ymaps: typeof import("yandex-maps");