export interface HttpResultModel<T = any> {
	code: number;
	msg: string;
	data: T;
}
export interface BaseModel {
	createId: string;
	createName: string;
	createDatetime: string;
	updateId: string;
	updateName: string;
	updateDatetime: string;
}
export interface PagingModel<T> {
	totalCount: number;
	pageCount: number;
	pageNum: number;
	pageSize: number;
	list: T[];
}
export interface MenuModel {
	key: string;
	icon?: string;
	name: string;
	path: string;
	children?: Array<MenuModel>;
}
