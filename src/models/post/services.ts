import { ServiceTypes } from "./types";

// *** リポジトリ層にそぐわないロジックを実装する
// *** まずコメントでロジックを言語化し、それを元にAIがコードを生成できるのが理想

export class Service {
	constructor() {
		console.log("Dummys.Service");
	}
	static sample() {
		console.log("Dummys.Service.func");
		const result: ServiceTypes["sample"] = {} as ServiceTypes["sample"];
	}
}
