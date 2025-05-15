export interface OrgModel {
	id: number;
	type?: number;
	fullName?: string;
	name: string;
	address?: string;
	lngLat?: string;
	mapProvinceCodeList?: Array<string>;
	mapZoomInit?: number;
	homeLogo?: string;
	adminLogo?: string;
	enabled?: boolean;
	level?: number;
	parentId?: number;
	parentType?: number;
	parentIdList?: Array<number>;
	parentNameList?: Array<string>;
	children?: Array<OrgModel>;
	region?: number;
}
