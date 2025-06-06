import { Major } from './major';

export interface Course {
	uid?: string;
	id?: string;
	name?: string;
	majors?: Major[];
	abbreviation?: string;
	createdAt?: string;
}
