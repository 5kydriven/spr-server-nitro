import { Subject } from './subject';

export interface Curriculum {
	uid: string;
	name: string;
	major: string;
	course: string;
	firstYear: any;
	secondYear: any;
	thirdear: any;
	fourthYear: any;
	createdAt: string;
}

export interface Semester {
	first: Subject[];
	second: Subject[];
}
