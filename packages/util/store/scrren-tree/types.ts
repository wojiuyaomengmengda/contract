export interface ScreenModel {
	createDatetime: string;
	createId: number;
	createName: any;
	dataType: number;
	description: string;
	enabled: boolean;
	name: string;
	orgId: number;
	path: string;
	permissionId: any;
	screenId: any;
	showType: number;
	sortIndex: number;
	updateDatetime: string;
	updateId: any;
	updateName: any;
	itemList: Array<ItemModel>;
	icon: string;
}

export interface ScreenTreeModel {
	createDatetime: string;
	createId: number;
	createName: any;
	groupId: any;
	icon: string;
	name: string;
	orgId: number;
	screenList: Array<ScreenModel>;
	subIcon: string;
	updateDatetime: string;
	updateId: any;
	updateName: string;
	permissionId: number;
}

export interface ItemModel {
	componentIdList: Array<number>;
	height: any;
	left: any;
	stackIndex: any;
	top: any;
	width: any;
	componentList: Array<componentModel>;
}

export interface componentModel {
	dataType: number;
	id: number;
	name: string;
	path: string;
	serviceType: number;
}
